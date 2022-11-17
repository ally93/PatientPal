from datetime import date
from typing import List, Optional, Union
from pydantic import BaseModel
from queries.pool import pool



class Error(BaseModel):
    message: str


class PatientIn(BaseModel):
    name: str
    birth_date: date
    email:str
    address: Optional[str]
    gender: str


class PatientOut(BaseModel):
    id: int
    name: str
    birth_date: date
    email:str
    address: Optional[str]
    gender: str


class PatientRepository:
    # def update(self, vacation_id: int, vacation: VacationIn) -> Union[VacationOut, Error]:
    #     try:
    #         # connect the database
    #         with pool.connection() as conn:
    #             # get a cursor(something to run SQL with)
    #             with conn.cursor() as db:
    #                 # run our SELECT statement
    #                 db.execute(
    #                     """
    #                     UPDATE vacations
    #                     SET name = %s
    #                         , from_date = %s
    #                         , to_date = %s
    #                         , thoughts = %s
    #                     Where id = %s
    #                     """,
    #                     [
    #                         vacation.name,
    #                         vacation.from_date,
    #                         vacation.to_date,
    #                         vacation.thoughts,
    #                         vacation_id
    #                     ]
    #                 )
    #                 # old_data = vacation.dict()
    #                 # return VacationOut(id=vacation_id, **old_data)
    #                 return self.vacation_in_to_out(vacation_id, vacation)
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not update vacation!"}



    def get_all(self) -> Union[Error,List[PatientOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, name, birth_date, email, address, gender
                        From patients
                        ORDER BY name;
                        """
                    )
                  
                    return [
                        PatientOut(
                            id=record[0],
                            name=record[1],
                            birth_date=record[2],
                            email=record[3],
                            address=record[4],
                            gender=record[5]
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all patients!"}



    def create(self, patient: PatientIn) -> PatientOut:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    # run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO patients
                            (name, birth_date, email, address, gender)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            patient.name,
                            patient.birth_date,
                            patient.email,
                            patient.address,
                            patient.gender
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.vacation_in_to_out(id, patient)
        except Exception as e:
            print(e)
            return {"message": "Could not create patient"}
                

    def patient_in_to_out(self, id: int, patient: PatientIn):
        old_data = patient.dict()
        return PatientOut(id=id, **old_data)