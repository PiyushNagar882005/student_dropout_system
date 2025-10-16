import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib, os

data_path = os.path.join("data", "students_sample.csv")

if not os.path.exists(data_path):
    print(f"❌ Dataset not found at {data_path}")
else:
    print("✅ Dataset found. Training model...")

    df = pd.read_csv(data_path)
    df['parent_support'] = df['parent_support'].map({'Yes': 1, 'No': 0})
    df['dropped_out'] = df['dropped_out'].map({'Yes': 1, 'No': 0})

    X = df[['age', 'attendance', 'grades', 'parent_support']]
    y = df['dropped_out']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    model_path = os.path.join("backend", "app", "models", "dropout_model.pkl")
    joblib.dump(model, model_path)

    print(f"✅ Model trained and saved successfully at: {model_path}")
