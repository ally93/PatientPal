# Customer Graphical Human Interface

## Landing Page
Initial page a user sees when the application starts. User has two options:
   * 'Register' - redirects to register form if they do not have an account in the database.
   * 'Login' - redirects to the homepage if the email and password matches in the database.
![landing-page](wireframes/landing-page.png)

## Register
Form for the user to create an account that is saved into the database. When successful, the user will be redirected to the landing page to log in.
![register](wireframes/register.png)


## Home Page
This is the first page a user sees when logged in.
From the navigation bar, the user has 4 options:
   * 'Home' - the page will not redirect.
   * 'Patients' - redirects to a list view of patients.
   * 'Create Patient' - redirects to a form that inputs a new patient.
   * 'Logout' - redirects to a page for log out verification.
![Home -- Logged in](wireframes/home-logged-in.png)

## Patient List
A list view of all patients that belong to the user.
The user can click on an individual patient id to view additional details or click on the create button to add a new patient to the database.
![Patient List](wireframes/patient-list.png)

## Create Patient
Form to enter a patient into the database. Date of birth and gender have drop down menus to aide inputs. If successful, the user will be redirected to a detail view of the patient.
![Create Patient](wireframes/create-patient.png)

## Patient Detail
Detail view of a patient that includes their name, patient id, date of birth, email, address, and gender. The user has three options:
   * 'All Patients' - redirects to a list view of patients.
   * 'Edit Patient' - redirects to a form to edit patient details.
   * 'Patient Questionnaires' - redirects to a list view of questionnaires of the patient.
   ![Patient Detail](wireframes/patient-detail.png)

## Update Patient
Form to update a patients' details. The form is prefilled with their current data. If successful, the user will be redirected to a detail view of the patient with updated information.
![Update Patient](wireframes/update-patient.png)

## Questionnaire List
List view of all questionnaires that belong to the patient.
The user can click on a specific questionnaire date to view the details of the questionnaire.
![Questionnaire List](wireframes/questionnaire-list.png)

## Create Questionnaire
Form to enter a questionnaire into the database for that specific patient. Date is a drowdown menu and weight can be incremented with the arrows. If successful, the user will be redirected to the detail view of the questionnaire.
![Create Questionnaire](wireframes/create-questionnaire.png)

## Questionnaire Detail
Detail view of the questionnaire that includes the medications, date, surgeries, concerns, weight, and blood pressure. The user has three options:
   * 'Edit' - redirects to a form to edit the questionnaire.
   * 'Delete' - redirects to the list view of questionnaires and deletes the questionnaire from the database.
   * 'Go Back' - redirects to the list view of questionnaires.
![Questionnaire Detail](wireframes/questionnaire-detail.png)

## Update Questionnaire
Form to update a questionnaires' details. The form is prefilled with their current data. If successful, the user will be redirected to a detail view of the questionnaire with updated information.
![Edit Questionnaire](wireframes/edit-questionnaire.png)

## Logout Verification
Page that asks the user to verify they want to log out. If yes, the user will be redirected to the landing page.
![Logout Verification](wireframes/logout-verification.png)
