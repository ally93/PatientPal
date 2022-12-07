import os
from fastapi import FastAPI
from routers import patients, questionnaires
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(patients.router)
app.include_router(questionnaires.router)

origins = [
    os.environ.get("CORS_HOST", "http://localhost"),
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
