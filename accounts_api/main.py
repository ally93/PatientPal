

from routers import accounts
from fastapi import FastAPI

# from api.routers import patients

app = FastAPI()
app.include_router(accounts.router)

# app.include_router(patients.router)