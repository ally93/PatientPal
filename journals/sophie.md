## November 15, 2022
Today we wanted to test merge requests by each creating our own journal branch and creating a merge request. There were issues with the pipeline failing that were fixed after verifying our accounts and the pipeline.

## November 16, 2022
Today I set up the database and fastapi. I had some issues at first but fixing the indentation on my docker compose file fixed the issues.
We choose Postgres because we wanted to have relations between our tables and use foreign keys.

## November 18, 2022
Today I started working on the table and endpoints for questionnaires.
Ally and I also had a review and merge session after completing the patients table and endpoints. I was able to test my endpoints after because my table had a reference to hers.

## November 21, 2022
Finished up all the endpoints for questionnaires. I was doubtful about the foreignkey because of how simple it was. I tested out the relationship by trying to create a questionnaire with an invalid patient id. An error in my terminal would appear saying that I violated some foreign key constraint. Tried again with a valid patient key and it worked!
All 4 of us also worked together to debug table migration issues. We ended up setting up 2 databases, one for each service.

Today I decided to rework my backend to filter questionnaires by patients. As I was thinking about building the front-end, I thought it would be easier to have endpoints that take in the patient id. A questionnaire cannot exist without that specific patient so I wanted to set that connection up automatically in the backend. This makes creating a questionnaire and such less prone to mistakes because the patient_id is already set to a valid one. There are no worries about inputting a patient id that does not exist now!

## November 29, 2022
Wrote a unit test to get all questionnaires.

## December 2, 2022
Fixed an es lint issue that was appearing in my terminal. I had an error say "React Hook useEffect has a missing dependency: 'fetchQuestionnaires'. Either include it or remove the dependency array". If I added 'fetchQuestionnaires' to the dependency array, it will continously make the fetch while im on that component. To fix this, I made the function to fetch questionnaires a callback.
