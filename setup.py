# c:\Users\Piyus\Desktop\student_dropout_system\student_dropout_system\backend; python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# run in the same machine / venv
import chromadb
from chromadb.config import Settings

# If you configured persist_directory in server, match that here:
# client = chromadb.Client(Settings(chroma_db_impl="duckdb+parquet", persist_directory="./chromadb"))
client = chromadb.Client()

col = client.get_collection("submissions")

# Get ids + metadata + documents (limit)
data = col.get(include=["ids","metadatas","documents"], limit=50)
print(data)