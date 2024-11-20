from typing import List
from sentence_transformers import SentenceTransformer

# Initialize the embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")  # Use a suitable pre-trained model


def generate_embedding(text: str) -> List[float]:
    """
    Generates an embedding for the given text using a pre-trained SentenceTransformer model.

    Args:
        text (str): The input text for which the embedding is to be generated.

    Returns:
        List[float]: A list of floats representing the embedding vector.
    """
    if not text.strip():
        raise ValueError("Input text cannot be empty.")
    return model.encode(text).tolist()


def batch_generate_embeddings(texts: List[str]) -> List[List[float]]:
    """
    Generates embeddings for a batch of texts.

    Args:
        texts (List[str]): A list of input texts.

    Returns:
        List[List[float]]: A list of embedding vectors for each input text.
    """
    if not texts:
        raise ValueError("Input text list cannot be empty.")
    return model.encode(texts).tolist()
