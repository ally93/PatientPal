from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional, Union
# from datetime import date
from queries.pool import pool

router = APIRouter()

class Error(BaseModel):
    message: str

class Account(BaseModel):
    id: int
    email: str
    hashed_password: str
    name: str
    pid: int

class AccountIn(BaseModel):
    email: str
    password: str
    name: str

class AccountOut(BaseModel):
    id: int
    email: str
    name: str

class AccountRepo:
    def get(self, email: str) -> Optional[Account]:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id
                            , email
                            , hashed_password
                            , name
                    FROM accounts
                    WHERE email = %s
                    """,
                    [email]
                )
                record = result.fetchone()
                if record is None:
                    return None

                return Account(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    name=record[3]
                )

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (email, hashed_password, name)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.email,
                        hashed_password,
                        account.full_name,
                    ]
                )
                id = result.fetchone()[0]
                return Account(
                    id=id,
                    email=account.email,
                    name=account.full_name,
                    hashed_password=hashed_password
                )


class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken():
    account: AccountOut

class HttpError(BaseModel):
    detail: str