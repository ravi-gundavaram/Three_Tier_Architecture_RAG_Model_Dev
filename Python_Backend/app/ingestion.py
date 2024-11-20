def ingest_document(doc_id: str, content: str):
    # Generate embeddings (mock example)
    embedding = f"embedding_{doc_id}"
    # Store in database (not implemented here)
    return {"doc_id": doc_id, "embedding": embedding}
