## December 9, 2022

* Readme

Today I finished up the readme. I had to remake all of our wireframes since they were pretty outdated and included our stretch goals. I wanted to make sure our wireframes accurately represented our application. Authentication was having some issues during this time so I couldnt see some of our pages until it was resolved.

## December 8, 2022

* Readme

Today I started on the readme. We havent touched it at all so it took some time to update.
Researched alot on markdown files. I was able to create links on our readme to keep it more organized and have the initial page clean. I first started with the apis section. This includes apis for questionnaires, patients, and accounts. I only included the input/output for creating a questionnaire, patient, and account.
I then started working on data models. Made a diagram to show the relationships between patients and questionnaires. For each table, I included the data type, if it is unique, and if its optional.

## December 5, 2022

* GHI flow cleanup

Today I played around with the flow of our application. I noticed that there wasnt a create questionnaire button. I added this onto the questionnaire list component.
I also tried to merge my unit test branch into main. I made the request but it looked like a team member ignored the chronological order of the merge requests, so my branch wasnt fully up to date.
I personally like to merge main into my local branch first to make sure everything works. It is also easier this way because you can resolve all merge conflicts locally first instead of pushing into main and hopping for the best..
I had to pull main, switch to my unit test branch, merge with main again, pushed, then merge request again.

## December 2, 2022

* pipeline clean up

Today I spent some time fixing eslint issues that were appearing in my terminal.
 I had an error say "React Hook useEffect has a missing dependency: 'fetchQuestionnaires'. Either include it or remove the dependency array". If I added 'fetchQuestionnaires' to the dependency array, it will continously make the fetch while im on that component. I tried to just move fetchquestionnaires() out of use effect and still got an error saying fetchquestionnaires wasnt a function or something like that..To fix this, I made the function to fetch questionnaires a callback.

## November 29, 2022

* Unit tests

Today I wrote a unit test to get all questionnaires and create questionnaires. I can see why we used dependency injections for this. When writting a unit test to get all questionnaires, I had to create a "fake" questionnaire query. This is because we do not want to directly hit the database when testing, we just want to make sure the endpoint works. After replacing the repository, I also had to override authentication. To test create questionnaire, I created a fake query again and overrode authentication. Also double check to make sure i'm testing for a 200 response.

## November 22+23, 2022

* Questionnaire React Components

Worked on the react portion for my endpoints.
I created react components for:
* List questionnaires
* List detail questionnaire
* Create questionnaire
* Edit questionnaire
and had a button that hits the delete questionnaire endpoint.
All of my components are function based and use useEffect to fetch the api calls

I was having issues when creating the edit questionnaire component. Going into it, I wanted to have the form inputs prefilled with the current data. This makes it easy for the user to have all the data is on the same screen while updating. I originally wanted to pass the state of that questionnaire in as props to my EditQuestionnaire function. I was able to do this but everytime I reload the page, the data isn't there anymore. I realized this didnt work because I am setting the state of the questionnaire when I go to the patient detail component. If I dont go through there first, the state isnt set which means no questionnaire inputs to prefill! I ended up just duplicating the fetch questionnaire function into my edit questionnaire component. I guess it doesnt really matter because I am hitting my own API, expense doesnt matter in this case.

## November 21, 2022

* Questionnaire endpoints

Finished up all the endpoints for questionnaires. I was doubtful about the foreign key because of how simple it was. I tested out the relationship by trying to create a questionnaire with an invalid patient id. An error in my terminal would appear saying that I violated some foreign key constraint. Tried again with a valid patient key and it worked!
All 4 of us also worked together to debug table migration issues. We ended up setting up 2 databases, one for each service. One database would be for accounts and the other for patients. I initally thought we would need some type of poller so patients and accounts can talk to each other. This wasnt the case as demonstrated by james' diagram.
We only needed a poller if a doctor(user) can view EVERY patient. In our case, a doctor(user) can only view THEIR patient, therefore we didnt need a poller.

Today I decided to rework my backend to filter questionnaires by patients. As I was thinking about building the front-end, I thought it would be easier to have endpoints that take in the patient id. A questionnaire cannot exist without that specific patient so I wanted to set that connection up automatically in the backend. This makes creating a questionnaire and such less prone to mistakes because the patient_id is already set to a valid one. There are no worries about inputting a patient id that does not exist now. To do this, I just added patient ID as a parameter.

## November 18, 2022

* SQL table & Questionnaire endpoints

Today I started working on the table and endpoints for questionnaires.
I needed endpoints for the following:

* get questionnaires
* get one questionnaire
* create questionnaire
* delete questionnaire
* edit questionnaire

I started by creating a migrations file in the patient api folder. I then created the migration file (003_questionnaire_table) and used SQL to create the table. The table for questionnaires
To create the table, created a migration file and created the table in there using SQL. The table for questionnaire has the following columns: id, medications, surgeires, concerns, weight, blood pressure, date, and a foreign key to patient id.
Initally I thought we had to make migrations for the tables through our terminal but Ally updated the docker files to migrate up the tables.
Ally and I also had a review and merge session after completing the patients table and endpoints. I was able to test my endpoints after because my table had a reference to hers.

## November 16, 2022

* Set up postgres and fastapi

Today I set up the database and fast api. At first when I tried docker compose build for fastapi, it wasnt working because I had some indentation issues for my service is the docker compose file. I was able to start the patients microservice after that. We decided that each microservice would have its own database so I created "gamma" as a database for the patient microservice.
I thought it would be better to choose postgres for our database because we dont have that much information to hold on the backend. We also wanted to have relations between doctor to patient to questionnaire so postgres seemed like the easier choice.

## November 15, 2022

* Merge requests

Today I wanted to practice merging requests since we havent done it in the past modules. I created a journal file to test it out and created a merge request to main. I noticed the pipeline failed so researched and did some digging on it. Realized that I had to put in my credit card information to verify my account. I tried to merge again and the pipeline was still failing. Finally got the pipeline to pass after verifying the pipeline. I could see there were already jobs set up for the pipelines and realized why merges werent passing. Just had to fix eslint issues and it worked.
