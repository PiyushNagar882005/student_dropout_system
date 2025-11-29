from fastapi import FastAPI
from dotenv import load_dotenv

# Load environment variables from a .env file if present
load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import pathlib
import pandas as pd
import json
from datetime import datetime
from typing import Optional, Dict, Any
import chromadb

app = FastAPI(title="Student Dropout Prediction API")

# CORS - allow local frontend dev servers
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = pathlib.Path(__file__).resolve().parent
model_path = BASE_DIR / "models" / "dropout_model.pkl"
# model may be a dict with {'model': clf, 'features': [...]}
model = joblib.load(model_path) if model_path.exists() else None


def _get_model_and_features(loaded):
    if loaded is None:
        return None, [], {}
    if isinstance(loaded, dict):
        clf = loaded.get('model') or loaded.get('clf') or None
        features = loaded.get('features') or []
        medians = loaded.get('medians') or {}
        return clf, features, medians
    return loaded, [], {}


clf, model_features, model_medians = _get_model_and_features(model)

# Initialize Chroma client and get/create submissions collection
try:
    ch_client = chromadb.Client()
    try:
        submissions_collection = ch_client.get_collection(name="submissions")
    except Exception:
        submissions_collection = ch_client.create_collection(name="submissions")
except Exception as e:
    print('ChromaDB init failed:', e)
    submissions_collection = None

# Mount auth router (lazy import to avoid circular)
from . import auth as auth_router
app.include_router(auth_router.router)

class StudentData(BaseModel):
    # Keep legacy fields for simple clients
    age: Optional[float] = None
    attendance: Optional[float] = None
    grades: Optional[float] = None
    parent_support: Optional[int] = None
    # Accept flexible additional fields
    extra: Optional[Dict[str, Any]] = None
    # Optional logged-in user info (provided by frontend)
    user: Optional[Dict[str, Any]] = None

@app.get("/api/health/ping")
def health_check():
    return {"status": "ok"}


@app.get("/api/model/features")
def model_features_endpoint():
    """Return the feature list and medians used for imputation (if available)."""
    if not model:
        return {"error": "Model not found."}
    return {"features": model_features, "medians": model_medians}

@app.post("/api/students/predict")
def predict_dropout(data: StudentData):
    if not clf:
        return {"error": "Model not found. Train it first."}

    # Build feature vector according to saved model features when available
    if model_features:
        row = []
        # map some common legacy names to saved feature names
        name_map = {
            'Age_at_enrollment': 'age',
            'Admission_grade': 'grades',
            'Curricular_units_1st_sem_(credited)': 'curr_1_credited',
            'Curricular_units_1st_sem_(enrolled)': 'curr_1_enrolled',
            'Curricular_units_1st_sem_(approved)': 'curr_1_approved',
            'Curricular_units_1st_sem_(grade)': 'curr_1_grade',
            'Curricular_units_2nd_sem_(credited)': 'curr_2_credited',
            'Curricular_units_2nd_sem_(enrolled)': 'curr_2_enrolled',
            'Curricular_units_2nd_sem_(approved)': 'curr_2_approved',
            'Curricular_units_2nd_sem_(grade)': 'curr_2_grade',
            'Unemployment_rate': 'unemployment_rate',
            'Inflation_rate': 'inflation_rate',
            'GDP': 'gdp'
        }

        # create a flattened dict of incoming values
        incoming = {}
        for k, v in data.dict().items():
            if k == 'extra' and isinstance(v, dict):
                incoming.update(v)
            else:
                incoming[k] = v

        for feat in model_features:
            # try direct name, then mapped legacy name, then lower-cased keys
            val = None
            if feat in incoming and incoming[feat] is not None:
                val = incoming[feat]
            else:
                mapped = name_map.get(feat)
                if mapped and mapped in incoming and incoming[mapped] is not None:
                    val = incoming[mapped]
                else:
                    # try simple fallback by lower-casing and removing punctuation
                    key_try = feat.lower().replace('(', '').replace(')', '').replace('-', '_').replace(' ', '_')
                    if key_try in incoming and incoming[key_try] is not None:
                        val = incoming[key_try]
            # default missing numeric to median if available, otherwise 0
            try:
                if val is None:
                    default = model_medians.get(feat, 0.0)
                    row.append(float(default))
                else:
                    row.append(float(val))
            except Exception:
                # fallback
                row.append(float(model_medians.get(feat, 0.0)))

        features = [row]
    else:
        # legacy behavior for older clients
        features = [[
            float(data.age or 0),
            float(data.attendance or 0),
            float(data.grades or 0),
            int(data.parent_support or 0)
        ]]

    # predict (and echo feature information for debugging)
    try:
        # print incoming payload for debugging
        print("Incoming payload:", incoming)
        print("Predict features:", model_features)
        print("Feature vector:", features)

        # convert to DataFrame with column names so sklearn receives feature names
        try:
            features_df = pd.DataFrame(features, columns=model_features)
        except Exception:
            # fallback to raw list if DataFrame creation fails
            features_df = None

        if features_df is not None:
            pred = clf.predict(features_df)[0]
            proba = None
            if hasattr(clf, 'predict_proba'):
                proba = float(clf.predict_proba(features_df)[0].max())
        else:
            pred = clf.predict(features)[0]
            proba = None
            if hasattr(clf, 'predict_proba'):
                proba = float(clf.predict_proba(features)[0].max())

        response = {
            "dropout_prediction": bool(pred),
            "probability": proba,
            "model_features": model_features,
            "feature_vector": features[0],
            "medians_used": model_medians
        }

        # persist submission for logged-in users into ChromaDB collection (if available)
        try:
            if data.user and submissions_collection is not None:
                doc_id = f"{data.user.get('id','anon')}_{int(datetime.utcnow().timestamp()*1000)}"
                metadata = {
                    'timestamp': datetime.utcnow().isoformat() + 'Z',
                    'user': data.user,
                    'incoming': incoming,
                    'model_features': model_features,
                    'feature_vector': features[0],
                    'prediction': bool(pred),
                    'probability': proba
                }
                doc_text = data.user.get('email') or data.user.get('name') or doc_id
                try:
                    submissions_collection.add(ids=[doc_id], metadatas=[metadata], documents=[doc_text])
                except Exception as e:
                    print('ChromaDB add failed, falling back to file write:', e)
                    # fallback to file write if Chroma add fails
                    submissions_dir = BASE_DIR.parent / 'data'
                    submissions_dir.mkdir(parents=True, exist_ok=True)
                    submissions_file = submissions_dir / 'submissions.jsonl'
                    with open(submissions_file, 'a', encoding='utf-8') as fh:
                        fh.write(json.dumps(metadata, ensure_ascii=False) + "\n")
        except Exception as e:
            print('Failed to save submission to ChromaDB:', e)

        return response
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}
