from fastapi import FastAPI
from fastapi.testclient import TestClient
from main import app
# from routers.patients import 
from queries.patients import PatientRepository, PatientIn, PatientOut, PatientUpdateIn

client = TestClient(app)

class EmptyPatientQueries:
    def get_all(self):
        return []

def test_get_all_patients():
    #arrange
    app.dependency_overrides[PatientRepository] =EmptyPatientQueries

    #act
    response = client.get("/api/patients")

    #assert
    assert response.status_code == 200
    assert response.json() == []

    #clean up
    app.dependency_overrides ={}

class CreatePatientQueries:
    def create(self, patient):
        result = {
                "id": 1
        }
        result.update(patient)
        return result


def test_create_patient():
    # Arrange
    app.dependency_overrides[PatientRepository] = CreatePatientQueries

    json = {
        "name":"Trina",
        "birth_date":"1990-11-23",
        "email":"email@email.com",
        "address":"central perk coffee house",
        "gender":"female",
        "doctor_id":12345
    }

    expected = {
        "id": 1,
        "name":"Trina",
        "birth_date":"1990-11-23",
        "email":"email@email.com",
        "address":"central perk coffee house",
        "gender":"female",
        "doctor_id": 12345,
    }

    # Act
    response = client.post("/api/patients", json=json)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected

    # Clean up
    app.dependency_overrides = {}