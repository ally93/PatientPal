from fastapi import FastAPI
from fastapi.testclient import TestClient
from main import app
# from routers.patients import 
from queries.patients import PatientRepository, PatientIn, PatientOut, PatientUpdateIn

client = TestClient(app)

class EmptyPatientQueries:
    def get_patients(self):
        return []

def test_get_all_patients():
    #arrange
    app.dependency_overrides[PatientRepository] =EmptyPatientQueries

    #act
    response = client.get("/api/patients")

    #assert
    assert response.status_code == 200
    assert response.json() == {"patients": []}

    #clean up
    app.dependency_overrides ={}