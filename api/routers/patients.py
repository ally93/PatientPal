from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.patients import (
    Error,
    PatientIn,
    PatientUpdateIn,
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
    patient: PatientUpdateIn,
    repo: PatientRepository = Depends(),
) -> Union[PatientOut, Error]:
    return repo.update(patient_id, patient)


@router.delete("/patients/{patient_id}", response_model=bool)
def delete_patient(
    patient_id: int,
    repo: PatientRepository = Depends(),
) -> bool:
    return repo.delete(patient_id)


@router.get("/patients/{patient_id}", response_model=Optional[PatientOut])
def get_one_patient(
    patient_id: int,
    response: Response,
    repo: PatientRepository = Depends(),
) -> PatientOut:
    patient = repo.get_one(patient_id)
    if patient is None:
        response.status_code = 404
    return patient