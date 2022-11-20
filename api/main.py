from fastapi import FastAPI, Response
from routers import patients
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(patients.router)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)