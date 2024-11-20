import pytest
from app.qna import answer_question


@pytest.fixture
def sample_question():
    return "What is the purpose of this document?"


@pytest.fixture
def sample_context():
    return "This document is used for testing question-answering functionality."


def test_answer_question(sample_question, sample_context):
    """
    Test the answer_question function with valid inputs.
    """
    result = answer_question(sample_question, sample_context)

    assert "question" in result
    assert result["question"] == sample_question
    assert "answer" in result
    assert isinstance(result["answer"], str)
    assert len(result["answer"]) > 0


def test_answer_question_empty_question(sample_context):
    """
    Test the answer_question function with an empty question.
    """
    with pytest.raises(ValueError, match="Question cannot be empty."):
        answer_question("", sample_context)


def test_answer_question_empty_context(sample_question):
    """
    Test the answer_question function with an empty context.
    """
    with pytest.raises(ValueError, match="Context cannot be empty."):
        answer_question(sample_question, "")


def test_answer_question_mocked_model(mocker, sample_question, sample_context):
    """
    Test the answer_question function with a mocked model.
    """
    mock_answer = "The document is for testing."
    mocker.patch("app.qna.model", autospec=True)
    mocker.patch("app.qna.model.predict", return_value={"answer": mock_answer})

    result = answer_question(sample_question, sample_context)
    assert result["answer"] == mock_answer
