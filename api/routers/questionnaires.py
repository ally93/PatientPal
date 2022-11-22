from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.questionnaires import (
    Error,
    QuestionnaireIn,
    QuestionnaireUpdateIn,
    QuestionnaireRepository,
    QuestionnaireOut,
)

router = APIRouter()

@router.post("/questionnaire", response_model=Union[QuestionnaireOut, Error])
def create_questionnaire(
    questionnaire: QuestionnaireIn,
    response: Response,
    repo: QuestionnaireRepository = Depends()
):
    # response.status_code = 400
    return repo.create(questionnaire)



@router.get("/questionnaire", response_model=Union[Error,List[QuestionnaireOut]])
def get_all(
    repo: QuestionnaireRepository = Depends()

):
    return repo.get_all()


@router.put("/questionnaire/{questionnaire_id}", response_model=Union[QuestionnaireOut, Error])
def update_questionnaire(
    questionnaire_id: int,
    questionnaire: QuestionnaireUpdateIn,
    repo: QuestionnaireRepository = Depends(),
) -> Union[QuestionnaireOut, Error]:
    return repo.update(questionnaire_id, questionnaire)


@router.delete("/questionnaire/{questionnaire_id}", response_model=bool)
def delete_patient(
    questionnaire_id: int,
    repo: QuestionnaireRepository = Depends(),
) -> bool:
    return repo.delete(questionnaire_id)


@router.get("/questionnaire/{questionnaire_id}", response_model=Optional[QuestionnaireOut])
def get_one_questionnaire(
    questionnaire_id: int,
    response: Response,
    repo: QuestionnaireRepository = Depends(),
) -> QuestionnaireOut:
    questionnaire = repo.get_one(questionnaire_id)
    if questionnaire is None:
        response.status_code = 404
    return questionnaire
