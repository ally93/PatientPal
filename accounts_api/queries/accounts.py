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
    name: str
    email: str
    hashed_password: str
    pid: int

class AccountIn(BaseModel):
    name: str
    email: str
    password: str
    pid: int

class AccountOut(BaseModel):
    id: int
    name: str
    email: str
    pid: int

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
                            , pid
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
                    name=record[3],
                    pid=record[4]
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
                        (email, hashed_password, name, pid)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.email,
                        hashed_password,
                        account.name,
                        account.pid
                    ]
                )
                id = result.fetchone()[0]
                return Account(
                    id=id,
                    email=account.email,
                    name=account.name,
                    hashed_password=hashed_password,
                    pid=account.pid
                )


class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken():
    account: AccountOut

class HttpError(BaseModel):
    detail: str
