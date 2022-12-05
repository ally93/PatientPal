from datetime import date
from typing import List, Optional, Union
from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class PatientIn(BaseModel):
    name: str
    birth_date: date
    email: str
    address: Optional[str]
    gender: str
    doctor_id: int


class PatientUpdateIn(BaseModel):
    name: Optional[str]
    birth_date: Optional[date]
    email: Optional[str]
    address: Optional[str]
    gender: Optional[str]
    doctor_id: Optional[int]


class PatientOut(BaseModel):
    id: int
    name: str
    birth_date: date
    email: str
    address: Optional[str]
    gender: str
    doctor_id: int


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
                             , doctor_id
                        FROM patients
                        WHERE id = %s
                        """,
                        [patient_id],
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
                        [patient_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, patient_id: int, patient: PatientUpdateIn
    ) -> Union[PatientOut, Error]:
        # get original patient details
        original = self.get_one(patient_id)
        # get patient fields to update and remove unset fields
        # (if null remove key)
        patient_data = patient.dict(exclude_unset=True)
        # create new patient details with the updated fields
        patient_detail = original.copy(update=patient_data)

        # update patient fields
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
                            , doctor_id = %s
                        Where id = %s
                        """,
                        [
                            patient_detail.name,
                            patient_detail.birth_date,
                            patient_detail.email,
                            patient_detail.address,
                            patient_detail.gender,
                            patient_detail.doctor_id,
                            patient_id,
                        ],
                    )
                    return self.patient_in_to_out(patient_id, patient_detail)
        except Exception as e:
            print(e)
            return {"message": "Could not update patient details!"}

    def get_all(self) -> Union[Error, List[PatientOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    db.execute(
                        """
                        SELECT id, name, birth_date, email, address,
                            gender, doctor_id
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
                            gender=record[5],
                            doctor_id=record[6],
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
                            (name, birth_date, email,
                            address, gender, doctor_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            patient.name,
                            patient.birth_date,
                            patient.email,
                            patient.address,
                            patient.gender,
                            patient.doctor_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.patient_in_to_out(id, patient)
        except Exception as e:
            print("failed to create patient", e)
            return {"message": "Could not create patient"}

    def patient_in_to_out(self, id: int, patient: PatientIn):
        old_data = patient.dict()
        if "id" in old_data:
            return PatientOut(**old_data)
        else:
            return PatientOut(id=id, **old_data)

    def record_to_patient_out(self, record):
        return PatientOut(
            id=record[0],
            name=record[1],
            birth_date=record[2],
            email=record[3],
            address=record[4],
            gender=record[5],
            doctor_id=record[6],
        )
