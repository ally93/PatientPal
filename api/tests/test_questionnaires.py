from fastapi.testclient import TestClient
from main import app
from queries.questionnaires import QuestionnaireRepository
from token_auth import get_current_user

# from queries.questionnaires import (
#     QuestionnaireIn,
#     QuestionnaireOut,
#     QuestionnaireUpdateIn,
# )

client = TestClient(app)


def override_auth_user():
    return []


# Unit test to get all questionnaires
class EmptyQuestionnaireQueries:
    def get_all_questionnaires(self):
        return []


def test_get_all_questionnaires():
    # arrange
    app.dependency_overrides[
        QuestionnaireRepository
    ] = EmptyQuestionnaireQueries
    app.dependency_overrides[get_current_user] = override_auth_user

    # act
    response = client.get("/questionnaire")

    # assert
    assert response.status_code == 200
    assert response.json() == []

    # clean up
    app.dependency_overrides = {}


# Unit test to create a questionnaire
class CreateQuestionnaireQueries:
    def create(self, patient_id, questionnaire):
        result = {"id": 1}
        result.update(questionnaire)
        return result


def test_create_questionnaire():
    # Arrange
    app.dependency_overrides[
        QuestionnaireRepository
    ] = CreateQuestionnaireQueries
    app.dependency_overrides[get_current_user] = override_auth_user

    json = {
        "medications": "banana",
        "surgeries": "banana",
        "concerns": "banana",
        "weight": 999,
        "blood_pressure": "banana",
        "date": "2022-11-11",
    }

    expected = {
        "id": 1,
        "medications": "banana",
        "surgeries": "banana",
        "concerns": "banana",
        "weight": 999,
        "blood_pressure": "banana",
        "date": "2022-11-11",
    }

    # Act
    response = client.post("/api/patient/0/questionnaire/create", json=json)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected

    # Clean up
    app.dependency_overrides = {}
