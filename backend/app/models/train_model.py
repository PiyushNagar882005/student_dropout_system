import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib, os

data_path = os.path.join("data", "students_sample.csv")
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib


data_path = os.path.join("data", "students_sample.csv")


def find_target_column(df: pd.DataFrame):
    # Common possibilities
    candidates = ['dropped_out', 'dropped out', 'Target', 'target', 'Outcome']
    for c in candidates:
        if c in df.columns:
            return c
    # fallback: look for a column with Dropout/Graduate values
    for col in df.columns:
        if df[col].dtype == object:
            vals = df[col].dropna().unique()
            sample = set([str(v).lower() for v in vals[:10]])
            if 'dropout' in sample or 'graduate' in sample:
                return col
    return None


if not os.path.exists(data_path):
    print(f"❌ Dataset not found at {data_path}")
    raise SystemExit(1)

print("✅ Dataset found. Preparing to train model...")

# Try to auto-detect delimiter (handles comma vs tab-delimited CSVs)
try:
    df = pd.read_csv(data_path, sep=None, engine='python')
except Exception:
    # fallback to tab-separated
    df = pd.read_csv(data_path, sep='\t')

# If the file was read as a single column with tab-separated header, re-read with tab
if len(df.columns) == 1 and '\t' in df.columns[0]:
    df = pd.read_csv(data_path, sep='\t')

# Normalize column names
df.columns = [c.strip() for c in df.columns]
print(f"Dataset columns: {list(df.columns)[:20]}{'...' if len(df.columns)>20 else ''}")

target_col = find_target_column(df)
if not target_col:
    print("❌ Could not find a suitable target column (expected 'Target' or similar). Please inspect the CSV.")
    raise SystemExit(1)

print(f"Using '{target_col}' as target column")

# Create binary target: 1 = Dropout, 0 = not Dropout
def make_binary_target(series: pd.Series):
    # handle common encodings
    lowered = series.astype(str).str.lower()
    return lowered.apply(lambda v: 1 if 'dropout' in v or v == '1' or v == 'yes' else 0)

y = make_binary_target(df[target_col])

# Candidate numeric features that exist in this dataset
preferred_features = [
    'Age_at_enrollment', 'Admission_grade',
    'Curricular_units_1st_sem_(credited)', 'Curricular_units_1st_sem_(enrolled)', 'Curricular_units_1st_sem_(approved)', 'Curricular_units_1st_sem_(grade)',
    'Curricular_units_2nd_sem_(credited)', 'Curricular_units_2nd_sem_(enrolled)', 'Curricular_units_2nd_sem_(approved)', 'Curricular_units_2nd_sem_(grade)',
    'Unemployment_rate', 'Inflation_rate', 'GDP'
]

available_features = [f for f in preferred_features if f in df.columns]

# If none of the preferred features exist, fall back to all numeric columns except the target
if not available_features:
    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
    available_features = [c for c in numeric_cols if c != target_col]

if not available_features:
    print("❌ No numeric features found to train on. Please provide numeric columns in the dataset.")
    raise SystemExit(1)

print(f"Using features: {available_features}")

X = df[available_features].copy()

# Simple preprocessing: fill missing numeric values with median
medians = {}
for col in X.columns:
    if X[col].dtype.kind in 'biufc':
        median = X[col].median()
        medians[col] = float(median) if pd.notna(median) else 0.0
        X[col] = X[col].fillna(median)
    else:
        # try to coerce non-numeric to numeric if possible
        # after coercion, record median (or 0) and fill
        X[col] = pd.to_numeric(X[col], errors='coerce')
        median = X[col].median()
        medians[col] = float(median) if pd.notna(median) else 0.0
        X[col] = X[col].fillna(medians[col])

# split and train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

preds = model.predict(X_test)
acc = accuracy_score(y_test, preds)

print(f"✅ Training complete. Test accuracy: {acc:.4f}")
print("Classification report:\n", classification_report(y_test, preds))

model_dir = os.path.join("backend", "app", "models")
os.makedirs(model_dir, exist_ok=True)
model_path = os.path.join(model_dir, "dropout_model.pkl")
joblib.dump({'model': model, 'features': available_features, 'medians': medians}, model_path)

print(f"✅ Model and metadata saved to: {model_path}")
