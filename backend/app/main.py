from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import pathlib

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
model = joblib.load(model_path) if model_path.exists() else None

class StudentData(BaseModel):
    age: int
    attendance: float
    grades: float
    parent_support: int

@app.get("/api/health/ping")
def health_check():
    return {"status": "ok"}

@app.post("/api/students/predict")
def predict_dropout(data: StudentData):
    if not model:
        return {"error": "Model not found. Train it first."}
    features = [[data.age, data.attendance, data.grades, data.parent_support]]
    pred = model.predict(features)[0]
    return {"dropout_prediction": bool(pred)}
