import os
from routers import  accounts
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator

# from api.routers import patients

app = FastAPI()

origins = [
    os.environ.get("CORS_HOST", "http://localhost"),
    "http://localhost:3000",
    "https://heaven-seven.gitlab.io/module3-project-gamma"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authenticator.router)
app.include_router(accounts.router)
