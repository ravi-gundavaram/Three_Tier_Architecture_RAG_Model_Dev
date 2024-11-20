from fastapi import FastAPI
from app.ingestion import ingest_document
from app.qna import answer_question
from fastapi.staticfiles import StaticFiles
import os
from pydantic import BaseModel

app = FastAPI()

static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")


class IngestRequest(BaseModel):
    doc_id: str
    content: str


@app.post("/ingest")
async def ingest(request: IngestRequest):
    return ingest_document(request.doc_id, request.content)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Python Backend API!"}


@app.get("/qna")
async def qna(question: str):
    return answer_question(question)
