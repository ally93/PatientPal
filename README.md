# Module3 Project Gamma

## Team - Heaven Seven

* Ally N Caruppaiya
* Jackie Sun
* Sophie Nguyen
* Tanner Halsey

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)

## Intended Market
We are targeting healthcare professionals who are looking for an organized and paperless approach to hold patient information.
Typically, a patient fills out a general questionnaire that is passed between staff. This application provides a clean interface to view the patients infromation while removing the chance of misplacing papers

## Functionality
* Questionnaires
  * The user can add a questionnaire everytime a patient visits. The questionnaire asks for the patients' current medications, surgeries, concerns, weight, blood pressure, and date.
  * The user is able to add, update, and delete questionnaires and view the details of an individual questionnaire or a list of all questionnaires.


## Project Initialization
To fully enjoy this application on your local machine, please make sure to follow these steps:
1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create postgres-data`
4. Run `docker compose build`
5. Run `docker compose up`
