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
    def get_one(self, patient_id: int) -> Optional[PatientOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                             , name
                             , birth_date
                             , email
                             , address
                             , gender
                        FROM patients
                        WHERE id = %s
                        """,
                        [patient_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_patient_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get patient details"}


    def delete(self, patient_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM patients
                        WHERE id = %s
                        """,
                        [patient_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def update(self, patient_id: int, patient: PatientIn) -> Union[PatientOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    db.execute(
                        """
                        UPDATE patients
                        SET name = %s
                            , birth_date = %s
                            , email = %s
                            , address = %s
                            , gender = %s
                        Where id = %s
                        """,
                        [
                            patient.name,
                            patient.birth_date,
                            patient.email,
                            patient.address,
                            patient.gender,
                            patient_id
                        ]
                    )
                    return self.patient_in_to_out(patient_id, patient)
        except Exception as e:
            print(e)
            return {"message": "Could not update patient details!"}

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
            print("failed to get list of patients", e)
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
                    return self.patient_in_to_out(id, patient)
        except Exception as e:
            print("failed to create patient", e)
            return {"message": "Could not create patient"}
                

    def patient_in_to_out(self, id: int, patient: PatientIn):
        old_data = patient.dict()
        return PatientOut(id=id, **old_data)

    
    def record_to_patient_out(self, record):
        return PatientOut(
            id=record[0],
            name=record[1],
            birth_date=record[2],
            email=record[3],
            address=record[4],
            gender=record[5],
        )