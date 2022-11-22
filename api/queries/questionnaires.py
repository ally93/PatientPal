from datetime import date
from typing import List, Optional, Union
from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class QuestionnaireIn(BaseModel):
    medications: str
    surgeries : str
    concerns : str
    weight: int
    blood_pressure: str
    date: date
    patient_id: int

class QuestionnaireUpdateIn(BaseModel):
    medications: Optional[str]
    surgeries : Optional[str]
    concerns : Optional[str]
    weight: Optional[int]
    blood_pressure: Optional[str]
    date: Optional[date]
    patient_id: Optional[int]

class QuestionnaireOut(BaseModel):
    id: int
    medications: str
    surgeries : str
    concerns : str
    weight: int
    blood_pressure: str
    date: date
    patient_id: int


class QuestionnaireRepository:
    def get_one(self, questionnaire_id: int) -> Optional[QuestionnaireOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                             , medications
                             , surgeries
                             , concerns
                             , weight
                             , blood_pressure
                             , date
                             , patient_id
                        FROM questionnaires
                        WHERE id = %s
                        """,
                        [questionnaire_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_questionnaire_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get questionnaire details"}


    def delete(self, questionnaire_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM questionnaires
                        WHERE id = %s
                        """,
                        [questionnaire_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def update(self, questionnaire_id: int, questionnaire: QuestionnaireUpdateIn) -> Union[QuestionnaireOut, Error]:
        # get original questionnaire details
        original = self.get_one(questionnaire_id)
        # get questionnaire fields to update and remove unset fields (if null remove key)
        questionnaire_data = questionnaire.dict(exclude_unset=True)
        # create new questionnaire details with the updated fields
        questionnaire_detail = original.copy(update=questionnaire_data)

        # update questionnaire fields
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    db.execute(
                        """
                        UPDATE questionnaires
                        SET medications = %s
                            , surgeries = %s
                            , concerns = %s
                            , weight = %s
                            , blood_pressure = %s
                            , date = %s
                            , patient_id = %s
                        Where id = %s
                        """,
                        [
                            questionnaire_detail.medications,
                            questionnaire_detail.surgeries,
                            questionnaire_detail.concerns,
                            questionnaire_detail.weight,
                            questionnaire_detail.blood_pressure,
                            questionnaire_detail.date,
                            questionnaire_detail.patient_id,
                            questionnaire_id
                        ]
                    )
                    return self.questionnaire_in_to_out(questionnaire_id, questionnaire_detail)
        except Exception as e:
            print(e)
            return {"message": "Could not update questionnaire details!"}

    def get_all(self, patient_id:int) -> Union[Error,List[QuestionnaireOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, medications, surgeries, concerns, weight, blood_pressure, date, patient_id
                        From questionnaires
                        WHERE patient_id= %s
                        ORDER BY date;
                        """,
                        [patient_id]
                    )

                    return [
                        QuestionnaireOut(
                            id=record[0],
                            medications=record[1],
                            surgeries=record[2],
                            concerns=record[3],
                            weight=record[4],
                            blood_pressure=record[5],
                            date =record[6],
                            patient_id=record[7]
                        )
                        for record in db
                    ]
        except Exception as e:
            print("failed to get list of questionnaires", e)
            return {"message": "Could not get all questionnaires!"}



    def create(self, questionnaire: QuestionnaireIn) -> QuestionnaireOut:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    # run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO questionnaires
                            (medications, surgeries, concerns, weight, blood_pressure, date, patient_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            questionnaire.medications,
                            questionnaire.surgeries,
                            questionnaire.concerns,
                            questionnaire.weight,
                            questionnaire.blood_pressure,
                            questionnaire.date,
                            questionnaire.patient_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.questionnaire_in_to_out(id, questionnaire)
        except Exception as e:
            print("failed to create questionnaire", e)
            return {"message": "Could not create questionnaire"}


    def questionnaire_in_to_out(self, id: int, questionnaire: QuestionnaireIn):
        old_data = questionnaire.dict()
        if 'id' in old_data :
            return QuestionnaireOut(**old_data)
        else:
            return QuestionnaireOut(id=id, **old_data)


    def record_to_questionnaire_out(self, record):
        return QuestionnaireOut(
            id=record[0],
            medications=record[1],
            surgeries=record[2],
            concerns=record[3],
            weight=record[4],
            blood_pressure=record[5],
            date = record[6],
            patient_id=record[7]
        )
