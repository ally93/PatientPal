## Dec 11, 2022

Today I worked on improving our user interface guided from the link below.
https://mdbootstrap.com/docs/react/extended/login-form/#section-login-card-example

## Dec 10, 2022
Today I worked on:

* page navigation with auth

While testing the app, I realized we were being taken into home without logging in and was unable to logout successfully. To fix this, first I broke up the pages into pages that requires auth and pages that doesn't need it, then I discovered a way to wrap the routes needing auth in privateroute. This privateroute checks if you have a session token, and only navigates appropriately if the token exist otherwise reroutes to login page. Session token was returning null inconsistently across the app. After alot of reading on google and stack overflow on how to hold the token, I realized we can use this thing called session storage which helps hold the token for the entire duration of a session. I modified useToken.js to store the session token after login in session storage(check useToken.js at getTokenInternal) and a local variable for faster access. Whenever the app requests the token, we first check the local variable and if its missing, returns the values in session storage. Whenever the user logs out, we delete the token in session storage and local variable (check useToken.js at logout ). Tested out the nav thru the app. The local var was getting its token cleared when I refreshed the page which is why session storage was needed.

- Stored user information (user id, name, etc.) when getting access token in sessionStorage similar to token above.
- Update patient list to filter patients based on doctor id (user id).
- Update patient create to default doctor id with user id so when you create patient it's under the user that's logged in. 

## Dec 9, 2022
Today I worked on:

* CI deployment in gitlab

So turns out the reason for our frontend not loading up as the token was not passed correctly is because my patients api in render did not even have the signing key. This is a great lesson and I am pretty sure I know what to do next time. 

## Dec 8, 2022
Today I worked on:

* CI deployment in gitlab


## Dec 7, 2022
Today I worked on:

* CI deployment in gitlab


## Dec 6, 2022
Today I worked on:

* CI deployment in gitlab



## Dec 5, 2022
Today I worked on:

* CI deployment in gitlab

I set up my gitlab ci-yaml file as recommended by our notes and class. I renamed our build frontend as build-patients-portal-front-end-job and pages as deploy-front-end. I tried deploying but it was failing on several lint jobs, when I fixed the lint i still was not able to deploy the frontend on gitlab.


## Dec 2, 2022
Today I worked on:

* CD deployment in render

I created a postgres sql and called it gamma, i started on deploying the api(patients and questionnaire) and was able to deploy it smoothly. I had issues to deploy our next microservice simply because it was ina different database and render plan that we currently have only allows 1 db to be deployed. So I moved the migration table from accounts_api into api and changed the docker dev file in accounts_api to not make migrations. I also updated our docker compose yml to use the same db but utilizes different ports as these are 2 microservices. I also turned the pipelines in gitlab to run again 

## Dec 1, 2022
Today I worked on:

* Continuous Unit testing on patient

I kept getting JSON non serializable error on create patients but once I manually changed in into a dictionary, it worked. I realized I need to update our readme and will look into it soon. Overall it is a fun experience writing a code to test the code I've written and I am excited to be doing this in a workspace soon. 

## Nov 30, 2022
Today I worked on:

* Continuous Unit testing on patient

I wrote 2 tests, one to test get all patients and one to create patients, I explained what errors I was having yesterday and my entire team helped me to walk the code one by one, we first realized we can only run the pytest command in the docker terminal, and I then understood why because the dependencies are only in the docker and running it locally will never work. Second, sophie told me the queries name has to match for it to correctly test it, once i tweaked it it ran!  



## Nov 29, 2022
Today I worked on:

* Unit testing on patient

Today we had a lecture on unit testing and how its important in deploying a clean and working code . Unit testing is a small code to test the code that you've written to check and make sure it is doing what it is supposed to be doing. It helps you write better code, catch bugs and errors earlier, helps making my code easier to refactor and personally makes me more efficient at writing code. There are 3 main steps to unit testing arrange - act - assert. I started working on test get all patients but kept running into an error that said get_all did not exist. As it is past 8pm, I will bring this issue up to my group tomorrow. 



## Nov 24, 2022
Today I worked on:

* update patient form with nav completed

Update form was very similar to patient form except I needed to add a defaultVal incase there are attributes that does not need to change. I also wanted to create a nav link from the list into the update page and was able to create an update button right next to the delete button in patient's list. Successful submission for the update form take you to the patient detail page with updated values. 




## Nov 23, 2022
Today I worked on:

* creating a delete button

Created a delete functionality in the PatientsList.js to be able to delete patients who are no longer with us. 


## Nov 22, 2022
Today I worked on:

* integrated doctor_id into patient queries

I added doctor_id into the migrations at patients table which meant I had to delete all docker containers and its volume, and build a new one. I also included doctor_id into the queries in patients.py



## Nov 21, 2022
Today I worked on:

* making a patient form to show details of the patient in react

I utilized instructor curtis's method of having a helper function to dry up the repetition of html code. I was also able to use useState hooks as this is a function-based component. I navigated a successful submission to that patient's detail page (it shows the completed form). Finally, I wanted a dropdown menu for the gender bar, and was able to create that drop down in the html portion. I was unable to change the colors of the buttons and want to find out why. 



## Nov 20, 2022
Today I learnt that we could pass parameters from the url into the react class directly to use it to identify the data. For eg:
  const { patient_id } = useParams();
So by doing this, we get the patient_id field directly and can use it in our code like pk in django. 

I had several pipeline errors, and one of the important errors led me to the revelation above and it said I was using the patient_id without setting it in the state and asked me to either set it to state or remove it all together. 



## Nov 18, 2022
Today we learnt about:

Authentication.

Tanner and Jackie paired up together to work on authentication-part for our group and explained how they were gonna go about it in our stand up. We had issues setting up the migration/database table for accounts. We kept getting an error that says 'Incompatible migration history at 001_account_migration', we assumed we had to delete our docker containers but turns out(thank you help me understand and all the seirs) we also had to delete our volume to make space for the new migration. We resolved it by deleting and recreating our volume. Overall it was a great team effort and I am sure I'll never forget this error again.



## Nov 17, 2022
Today I worked on:

* updating a patient detail and also deleting patient

I continued to chip away at the code and wrap up the lose ends by writing the update and delete part for the patients model. Before merging it to main, I sent in a merge request and asked my team-mates on their input on it. One of my team-mate Jackie inquired if the put request has to be updated entirely or could there be partial updates, and I quickly realized I have coded it in such a way that if you partially update a patient you get an error saying some required fields are missing. I created another class with all the inputs being entirely optional and included it in my put request to eliminate that error. I am grateful for my team-mates hawk-like eyes, to notice something that had completely slipped mine. 



## Nov 16, 2022
Today, I worked on:

* Getting patients's list, updating patient's detail and create a patient

I wrote some postgresql and utilized FastAPI framework to test out the backend codes.
I faced some difficulties to see my table in the database and I was getting a syntax error in api/migrations/__main__.py folder but actually the issue was an extra comma in the api/migrations/001_patient_table.py. I was so amazed by how an error can be in a different file as to the error message but also made a mental note to double check my work before running it. 
I also had to run <export DOCKER_DEFAULT_PLATFORM="linux/amd64"> initially when I faced an OperationalError: connection failed: SCRAM authentication requires libpq version 10 or above. 



## Nov 15, 2022
* A new start

Today marks the start of my journal for this project gamma . Cheers!