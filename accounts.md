from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.accounts import Account
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountRepo,
    Error,
    Account
)

router = APIRouter()


def fake_hash_password(password: str):
    return "fakehashed" + password


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")




def get_account(db, username: str):
    if username in db:
        user_dict = db[username]
        return AccountIn(**user_dict)


def fake_decode_token(token):
    # This doesn't provide any security at all
    # Check the next version
    user = get_account(Account, token)
    return user


async def get_current_account(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_active_user(current_user: Account = Depends(get_current_account)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    account_dict = Account.get(form_data.username)
    if not account_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = AccountIn(**account_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}


@router.get("/users/me")
async def read_users_me(current_user: Account = Depends(get_current_active_user)):
    return current_user
