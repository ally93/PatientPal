FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY main.py main.py
COPY token_auth.py token_auth.py

COPY migrations migrations
COPY queries queries
COPY routers routers

RUN pip install -r requirements.txt
CMD python -m migrations up && uvicorn main:app --reload --host 0.0.0.0 --port $PORT