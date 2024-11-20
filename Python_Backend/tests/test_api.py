import pytest
from fastapi.testclient import TestClient
from app.main import app

# Create a TestClient instance for the FastAPI app
client = TestClient(app)


@pytest.fixture
def sample_document():
    return {
        "doc_id": "test-doc",
        "content": "This is a test document for embedding generation.",
    }


def test_ingest_endpoint(sample_document):
    """
    Test the /ingest endpoint for document ingestion.
    """
    response = client.post("/ingest", json=sample_document)
    assert response.status_code == 200
    assert "doc_id" in response.json()
    assert response.json()["doc_id"] == sample_document["doc_id"]
    assert "embedding" in response.json()


def test_ingest_endpoint_empty_content():
    """
    Test the /ingest endpoint with empty content.
    """
    response = client.post("/ingest", json={"doc_id": "empty-doc", "content": ""})
    assert response.status_code == 400
    assert response.json()["detail"] == "Input text cannot be empty."


def test_qna_endpoint():
    """
    Test the /qna endpoint for question answering.
    """
    question = "What is the purpose of this document?"
    response = client.get(f"/qna?question={question}")
    assert response.status_code == 200
    assert "question" in response.json()
    assert response.json()["question"] == question
    assert "answer" in response.json()


def test_qna_endpoint_empty_question():
    """
    Test the /qna endpoint with an empty question.
    """
    response = client.get("/qna?question=")
    assert response.status_code == 400
    assert response.json()["detail"] == "Question cannot be empty."
