### Create a new Patient

* Endpoint path: /addpatient
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
      "name": string
      "DOB": text
      "email": URLField
      "address": text
      "gender": text
    }
    ```
* Response: An indication of success or failure
* Response shape:
    ```json
    {
      "success": boolean,
      "message": string,

      "failure": boolean,
      "message": string,
    }
    ```

### Get a list of Patients

* Endpoint path: /doctors`${PID}`
* Endpoint method: GET
* Query parameters:
  * DOB: the word(s) to search for

* Headers:
  * Authorization: Bearer token

* Response: A list of patients
* Response shape:
    ```json
    {
      "patients": [
        {
        "name": string,
        "DOB": text,
        "gender": text,
        "id": int,
        }
      ]
    }
    ```

### Get details of patient

* Endpoint path: /paitent`${ID}
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A detail of patient
* Response shape:
    ```json
    {
      "patient": [
        {
          "Name": string,
          "DOB": string,
          "address": string,
          "gender": string,
          "id": number,
          "email": URLField,
        }
      ]
    }

### Edit a Patient

* Endpoint path: /doctor/patients/patient`$ {id}`/edit
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Response: Edit a Patient
* Response shape:
    ```json
    {
      "patient": [
        {
          "name": string,
          "DOB": date,
          "address": string,
          "email": UrlField,
          "Gender": string
        }
      ]
    }
    ```

###  Add Questionnaire

* Endpoint path: /api/patient/<int:pk>/questionnaire/create
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
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

* Response shape:
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

### Get a list of Patient Questionnaires

* Endpoint path: /api/patient/<int:pk>/questionnaires
* Endpoint method: GET
* Query parameters:
  * Patient id

* Headers:
  * Authorization: Bearer token

* Response: A list of questionnaires for that patient
* Response shape:
    ```json
    {
      "questionnaires": []
    }
    ```

### Get details of a questionnaire

* Endpoint path: /questionnaire/<int:pk>
* Endpoint method: GET
* Query parameters:
  * Questionnaire id
* Headers:
  * Authorization: Bearer token

* Response: A detail of the questionnaire
* Response shape:
    ```json
    {
        "id": int,
        "medications": str,
        "surgeries": str,
        "concerns": str,
        "weight": int,
        "blood_pressure": str,
        "date": date,
        "patient_id": int
    }

### Doctor Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```
