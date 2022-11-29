from fastapi.testclient import TestClient
from main import app
from queries.questionnaires import QuestionnaireRepository
from queries.questionnaires import QuestionnaireIn, QuestionnaireOut, QuestionnaireUpdateIn

client = TestClient(app)

class EmptyQuestionnaireQueries:
    def get_all_questionnaires(self):
        return []

def test_get_all_questionnaires():
    #arrange
    app.dependency_overrides[QuestionnaireRepository] =EmptyQuestionnaireQueries

    #act
    response = client.get("/questionnaire")

    #assert
    assert response.status_code == 200
    assert response.json() == []

    #clean up
    app.dependency_overrides ={}
