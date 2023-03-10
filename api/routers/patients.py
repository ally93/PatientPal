from fastapi import APIRouter, Depends, Response, HTTPException, status
from token_auth import get_current_user
from typing import Union, List, Optional
from queries.patients import (
    Error,
    PatientIn,
    PatientUpdateIn,
    PatientRepository,
    PatientOut,
)

router = APIRouter()

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.post("/api/patients", response_model=Union[PatientOut, Error])
def create_patient(
    patient: PatientIn,
    response: Response,
    repo: PatientRepository = Depends(),
    account_data: dict = Depends(get_current_user),
):
    # response.status_code = 400
    return repo.create(patient)


@router.get("/api/patients", response_model=Union[Error, List[PatientOut]])
def get_all(
    repo: PatientRepository = Depends(),
    account_data: dict = Depends(get_current_user),
):
    return repo.get_all()


@router.put(
    "/api/patients/{patient_id}", response_model=Union[PatientOut, Error]
)
def update_patient(
    patient_id: int,
    patient: PatientUpdateIn,
    repo: PatientRepository = Depends(),
    account_data: dict = Depends(get_current_user),
) -> Union[PatientOut, Error]:
    return repo.update(patient_id, patient)


@router.delete("/api/patients/{patient_id}", response_model=bool)
def delete_patient(
    patient_id: int,
    repo: PatientRepository = Depends(),
    account_data: dict = Depends(get_current_user),
) -> bool:
    return repo.delete(patient_id)


@router.get("/api/patients/{patient_id}", response_model=Optional[PatientOut])
def get_one_patient(
    patient_id: int,
    response: Response,
    repo: PatientRepository = Depends(),
    account_data: dict = Depends(get_current_user),
) -> PatientOut:
    patient = repo.get_one(patient_id)
    if patient is None:
        response.status_code = 404
    return patient
