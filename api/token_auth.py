import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="fastapi_token")
SECRET_KEY = os.environ.get("SIGNING_KEY", "blah")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY)
        username: str = payload.get("sub")
        print("user name from jwt payload: ", username)
        if username is None:
            raise credentials_exception

    except JWTError:
        print("failed to read token from jwt")
        raise credentials_exception
    user = payload.get("account")
    if user is None:
        print("account payload has nothing")
        raise credentials_exception
    print("got user! ", user)
    return user

    # except JWTError:
    #     raise credentials_exception
    # user = AccountOut(**payload.get("account"))
    # if user is None:
    #     raise credentials_exception
    # return user
