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
