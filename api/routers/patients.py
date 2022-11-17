from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.patients import (
    Error,
    PatientIn,
    PatientRepository,
    PatientOut,
)

router = APIRouter()

@router.post("/patients", response_model=Union[PatientOut, Error])
def create_patient(
    patient: PatientIn,
    response: Response,
    repo: PatientRepository = Depends()
):
    # response.status_code = 400
    return repo.create(patient)
    


@router.get("/patients", response_model=Union[Error,List[PatientOut]])
def get_all(
    repo: PatientRepository = Depends()

):
    return repo.get_all()

@router.put("/patients/{patient_id}", response_model=Union[PatientOut, Error])
def update_patient(
    patient_id: int,
    patient: PatientIn,
    repo: PatientRepository = Depends(),
) -> Union[PatientOut, Error]:
    return repo.update(patient_id, patient)