# APIs

## Patient

| Method           | Path                     |
| ---------------- | -------------------------|
| POST             | `/api/patients/`         |
| GET              | `/api/patients/`         |
| PUT              | `/api/patients/<int:pk>` |
| DELETE           | `/api/patients/<int:pk>` |
| GET              | `/api/patients/<int:pk>` |

### Creating a Patient
Saves the name, birth date, email, address, gender, and doctor id to the database. Each patient is given a unique identifier when created. A user/doctor can then update or delete the patient.

Input:

```json
{
    "name": str,
    "birth_date": date,
    "email": str,
    "address": str,
    "gender": str,
    "doctor_id": int
}
```

Output:

```json
{
    "id": int,
    "name": str,
    "birth_date": date,
    "email": str,
    "address": str,
    "gender": str,
    "doctor_id": int
}
```

## Questionnaire

| Method           | Path                                           |
| ---------------- | -----------------------------------------------|
| GET              | `/questionnaire/`                              |
| GET              | `/questionnaire/<int:pk>`                      |
| DELETE           | `/questionnaire/<int:pk>`                      |
| GET (BY PATIENT) | `/api/patient/<int:pk>/questionnaires`         |
| POST (BY PATIENT)| `/api/patient/<int:pk>/questionnaire/create`   |
| PUT (BY PATIENT) | `/api/patient/<int:pk>/questionnaire/<int:pk>` |

### Creating a Questionnaire
Requires patient id as a parameter. Saves the medications, surgeries, concerns, weight, blood pressure, and date to the database. Each questionnaire is given unique identifier when created. A user/doctor can then update or delete the questionnaire.

Input:

```json
{
    "medications": str,
    "surgeries": str,
    "concerns": str,
    "weight": int,
    "blood_pressure": str,
    "date": date
}
```

Output:

```json
{
    "id": int,
    "medications": str,
    "surgeries": str,
    "concerns": str,
    "weight": int,
    "blood_pressure": str,
    "date": date

}
```

## Account

| Method           | Path                     |
| ---------------- | -------------------------|
| GET              | `/api/accounts/me/token` |
| POST             | `/api/accounts`          |

### Creating an Account
Saves the name, birth date, email, address, gender, and doctor id to the database. Each account is given a unique identifier when created.

Input:

```json
{
    "name": str,
    "email": str,
    "password": str,
    "pid": int
}
```

Output:

```json
{
    "id": int,
    "name": str,
    "email": str,
    "pid": int
}
```
