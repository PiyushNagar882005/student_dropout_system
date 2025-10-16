import os

folders = [
    "backend/app/models",
    "backend/app/routers",
    "backend/app/services",
    "backend/app/utils",
    "frontend",
    "data"
]

files = {
    "backend/app/main.py": "",
    "backend/app/database.py": "",
    "backend/requirements.txt": """fastapi
uvicorn[standard]
pandas
scikit-learn
joblib
""",
    "README.md": "# Student Dropout Prediction + Counselling System\n",
    ".gitignore": "venv/\n__pycache__/\n*.pkl\n",
}

for f in folders:
    os.makedirs(f, exist_ok=True)

for f, content in files.items():
    with open(f, "w") as file:
        file.write(content)

print("✅ Folder structure created successfully!")
