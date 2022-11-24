from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.questionnaires import (
    Error,
    QuestionnaireIn,
    QuestionnaireUpdateIn,
    QuestionnaireRepository,
    QuestionnaireOut,
    EntireQuestionnaireOut
)

router = APIRouter()

@router.get("/questionnaire/{questionnaire_id}", response_model=Optional[EntireQuestionnaireOut])
def get_one_questionnaire(
    questionnaire_id: int,
    response: Response,
    repo: QuestionnaireRepository = Depends(),
) -> EntireQuestionnaireOut:
    questionnaire = repo.get_one(questionnaire_id)
    if questionnaire is None:
        response.status_code = 404
    return questionnaire

@router.get("/questionnaire", response_model=Union[Error,List[EntireQuestionnaireOut]])
def get_all_questionnaires(
    repo: QuestionnaireRepository = Depends()
):
    return repo.get_all_questionnaires()

@router.get("/api/patient/{patient_id}/questionnaires", response_model=Union[Error,List[QuestionnaireOut]])
def get_all_by_patient(
    patient_id:int,
    repo: QuestionnaireRepository = Depends()
):
    return repo.get_all_by_patient(patient_id)

@router.post("/api/patient/{patient_id}/questionnaire/create", response_model=Union[QuestionnaireOut, Error])
def create_questionnaire(
    patient_id:int,
    questionnaire: QuestionnaireIn,
    response: Response,
    repo: QuestionnaireRepository = Depends()
):
    # response.status_code = 400
    return repo.create(patient_id,questionnaire)

@router.put("/api/patient/{patient_id}/questionnaire/{questionnaire_id}", response_model=Union[QuestionnaireOut, Error])
def update_questionnaire(
    patient_id:int,
    questionnaire_id: int,
    questionnaire: QuestionnaireUpdateIn,
    repo: QuestionnaireRepository = Depends(),
) -> Union[QuestionnaireOut, Error]:
    return repo.update(patient_id, questionnaire_id, questionnaire)

@router.delete("/questionnaire/{questionnaire_id}", response_model=bool)
def delete_questionnaire(
    questionnaire_id: int,
    repo: QuestionnaireRepository = Depends(),
) -> bool:
    return repo.delete(questionnaire_id)
