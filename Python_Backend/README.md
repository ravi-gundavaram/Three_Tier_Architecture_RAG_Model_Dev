How to Run:
Start the backend:

uvicorn app.main:app --reload
Run the frontend (if applicable):
ng serve

API Endpoints:
Provide a list of all API endpoints and their usage.
Example:

POST /ingest
Request Body:
{
    "doc_id": "doc1",
    "content": "example content"
}
Testing Instructions:
How to run the tests using pytest:

pytest
Dependencies:
List all major dependencies (e.g., FastAPI, httpx) and their versions.