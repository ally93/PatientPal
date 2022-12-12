<<<<<<< HEAD
## December 8/9. 2022
Started and completed readme. I updated our readme with our wireframes, apis, and data models. Researched alot on markdown files. I was able to create links on our readme to keep it more organized and have the initial page clean.
I also redid all of our wireframes on excalidraw to reflect changes.

## December 5, 2022
Added a create questionnaire button to the questionnaire list page.
Merged my unit tests and button with main.

## December 2, 2022
Fixed an es lint issue that was appearing in my terminal. I had an error say "React Hook useEffect has a missing dependency: 'fetchQuestionnaires'. Either include it or remove the dependency array". If I added 'fetchQuestionnaires' to the dependency array, it will continously make the fetch while im on that component. To fix this, I made the function to fetch questionnaires a callback.

## November 29, 2022
Wrote a unit test to get all questionnaires. The way that we learned how to create a unit test in class seemed more complex than the learn readings did so I had to rewatch the videos and do additional reading to figure out the unit tests.
Also wrote a unit test to create a questionnaire.

## November 22+23, 2022
Worked on the react portion for my endpoints.
I created react components for:
-List questionnaires
-List detail questionnaire
-Create questionnaire
-Edit questionnaire
and had a button that hits the delete questionnaire endpoint.
All of my components are function based and use useEffect to fetch the api calls

I was having issues when creating the edit questionnaire component. Going into it, I wanted to have the form inputs prefilled with the current data. This makes it easy for the user to have all the data is on the same screen while updating. I originally wanted to pass the state of that questionnaire in as props to my EditQuestionnaire function. I was able to do this but everytime I reload the page, the data isn't there anymore. I realized this didnt work because I am setting the state of the questionnaire when I go to the patient detail component. If I dont go through there first, the state isnt set which means no questionnaire inputs to prefill! I ended up just duplicating the fetch questionnaire function into my edit questionnaire component. I guess it doesnt really matter because I am hitting my own API, expense doesnt matter in this case.

## November 21, 2022
Finished up all the endpoints for questionnaires. I was doubtful about the foreignkey because of how simple it was. I tested out the relationship by trying to create a questionnaire with an invalid patient id. An error in my terminal would appear saying that I violated some foreign key constraint. Tried again with a valid patient key and it worked!
All 4 of us also worked together to debug table migration issues. We ended up setting up 2 databases, one for each service.

Today I decided to rework my backend to filter questionnaires by patients. As I was thinking about building the front-end, I thought it would be easier to have endpoints that take in the patient id. A questionnaire cannot exist without that specific patient so I wanted to set that connection up automatically in the backend. This makes creating a questionnaire and such less prone to mistakes because the patient_id is already set to a valid one. There are no worries about inputting a patient id that does not exist now!

## November 18, 2022
Today I started working on the table and endpoints for questionnaires.
I needed endpoints for the following:
get questionnaires,
get one questionnaire,
create questionnaire,
delete questionnaire,
and edit questionnaire.
To create the table, created a migration file and created the table in there using SQL.
Initally I thought we had to make migrations for the tables through our terminal but Ally updated the docker files to migrate up the tables.
Ally and I also had a review and merge session after completing the patients table and endpoints. I was able to test my endpoints after because my table had a reference to hers.

## November 16, 2022
Today I set up the database and fastapi. I had some issues at first but fixing the indentation on my docker compose file fixed the issues.
We choose Postgres because we wanted to have relations between our tables and use foreign keys.
I was interested in using Mongo but felt that the lectures and learn notes were not sufficent enough to invest in.

## November 15, 2022
Today we wanted to test merge requests by each creating our own journal branch and creating a merge request. There were issues with the pipeline failing. We didnt really go over that in lecture so spent some time trying to figure out what it meant and how to fix it. Not even sure if it was important or not since we always receive vauge answers. Finally got it to work after inputting my card information. Then I had to validate the pipeline.
=======
>>>>>>> main
