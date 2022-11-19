from fastapi import FastAPI
from routers import patients, questionnaires


app = FastAPI()
app.include_router(patients.router)
app.include_router(questionnaires.router)
