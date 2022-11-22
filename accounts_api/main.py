

from routers import  accounts2
from fastapi import FastAPI
from authenticator import authenticator

# from api.routers import patients

app = FastAPI()
# app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(accounts2.router)

# app.include_router(patients.router)
