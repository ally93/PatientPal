from fastapi.testclient import TestClient
from main import app
from queries.questionnaires import QuestionnaireRepository
# from queries.questionnaires import (
#     QuestionnaireIn,
#     QuestionnaireOut,
#     QuestionnaireUpdateIn,
# )

client = TestClient(app)


class EmptyQuestionnaireQueries:
    def get_all_questionnaires(self):
        return []


def test_get_all_questionnaires():
    # arrange
    app.dependency_overrides[
        QuestionnaireRepository
    ] = EmptyQuestionnaireQueries

    # act
    response = client.get("/questionnaire")

    # assert
    assert response.status_code == 200
    assert response.json() == []

    #clean up
    app.dependency_overrides ={}


class CreateQuestionnaireQueries:
    def create(self,patient_id, questionnaire):
        result = {
            "id": 1
        }
        result.update(questionnaire)
        return result

def test_create_questionnaire():
    # Arrange
    app.dependency_overrides[QuestionnaireRepository] = CreateQuestionnaireQueries

    json = {
            "medications":"banana",
            "surgeries":"banana",
            "concerns":"banana",
            "weight":999,
            "blood_pressure":"banana",
            "date": "2022-11-11",
            }


    expected = {
        "id":1,
        "medications":"banana",
        "surgeries":"banana",
        "concerns":"banana",
        "weight":999,
        "blood_pressure":"banana",
        "date": "2022-11-11",
        }


    # Act
    response = client.post("/api/patient/0/questionnaire/create" ,json=json)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected

    # Clean up
    app.dependency_overrides = {}
