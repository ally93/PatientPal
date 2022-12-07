from fastapi import APIRouter, Depends, Response, HTTPException, status
from token_auth import get_current_user
from typing import Union, List, Optional
from queries.questionnaires import (
    Error,
    QuestionnaireIn,
    QuestionnaireUpdateIn,
    QuestionnaireRepository,
    QuestionnaireOut,
    EntireQuestionnaireOut,
)

router = APIRouter()

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

@router.get(
    "/questionnaire/{questionnaire_id}",
    response_model=Optional[EntireQuestionnaireOut],
)
def get_one_questionnaire(
    questionnaire_id: int,
    response: Response,
    repo: QuestionnaireRepository = Depends(),
    account_data: dict = Depends(get_current_user),
) -> EntireQuestionnaireOut:
    questionnaire = repo.get_one(questionnaire_id)
    if questionnaire is None:
        response.status_code = 404
    return questionnaire


@router.get(
    "/questionnaire", response_model=Union[Error, List[EntireQuestionnaireOut]]
)
def get_all_questionnaires(
    repo: QuestionnaireRepository = Depends(),
    account_data: dict = Depends(get_current_user),
):
    return repo.get_all_questionnaires()


@router.get(
    "/api/patient/{patient_id}/questionnaires",
    response_model=Union[Error, List[EntireQuestionnaireOut]],
)
def get_all_by_patient(
    patient_id: int, repo: QuestionnaireRepository = Depends(),
    account_data: dict = Depends(get_current_user),
):
    return repo.get_all_by_patient(patient_id)


@router.post(
    "/api/patient/{patient_id}/questionnaire/create",
    response_model=Union[QuestionnaireOut, Error],
)
def create_questionnaire(
    patient_id: int,
    questionnaire: QuestionnaireIn,
    response: Response,
    repo: QuestionnaireRepository = Depends(),
    account_data: dict = Depends(get_current_user),
):
    # response.status_code = 400
    return repo.create(patient_id, questionnaire)


@router.put(
    "/api/patient/{patient_id}/questionnaire/{questionnaire_id}",
    response_model=Union[QuestionnaireOut, Error],
)
def update_questionnaire(
    patient_id: int,
    questionnaire_id: int,
    questionnaire: QuestionnaireUpdateIn,
    repo: QuestionnaireRepository = Depends(),
    account_data: dict = Depends(get_current_user),
) -> Union[QuestionnaireOut, Error]:
    return repo.update(patient_id, questionnaire_id, questionnaire)


@router.delete("/questionnaire/{questionnaire_id}", response_model=bool)
def delete_questionnaire(
    questionnaire_id: int,
    repo: QuestionnaireRepository = Depends(),
    account_data: dict = Depends(get_current_user),
) -> bool:
    return repo.delete(questionnaire_id)
