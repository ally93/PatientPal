## December 09, 2022
* Finishing up frontend authentication

Today we worked with Tristen to solve minor bugs within our application. He helped us realize a few mistakes we were making with our front end code. After the fix, we were able to deploy successfully.

I learned that we can use destructuring in the components to implement the useToken code provided. This was very helpful and I refactored registering, login and logout components.

## December 08, 2022
* Testing and debugging frontend authentication

Today I worked on testing the frontend authentication and I ran into an issue where the page would redirect to a blank screen when I refreshed the page. It was really frustrating trying to find out the culprit. Tristen took a look at our application and tried to help us with the issue. We spent the rest of the day trying to debug the problem.

We tore the code apart to its base and worked our way up. We realized that the if statement Adrian told us to implement was the issue and we removed it.

## December 07, 2022
* Continued to work on frontend authentication

Today I continued on implementing frontend authentication. I protected all endpoints in our other api routers. I attempted to test on the FastAPI docs page but was still getting 401 unauthorized. James demonstrated that we can paste the curl command provided by the docs page in the terminal to test the code.

I realized that Windows and Mac operate differently when it comes to curl commands. I spent the entire night reviewing the code and going down rabbit holes on how to use curl commands, but got nowhere. I asked Tanner to run the command on his side and it worked flawlessly. I thought the code was incorrect but it was just a difference with curl commands and operating systems.

## December 06, 2022
* Worked on frontend authentication

Today I started to work on frontend authentication. I decided to implement the useToken from the cookbook provided. I followed the instructions and it was a little confusing. I had to consult with my group members and Adrian to help with implementation.

The application was giving 401 unauthorized error when not authenticated but it would still show the page on the browser. Adrian told me to add an if statement in app.js which returns different jsx if the token wasn't there.

## December 05, 2022
* Review frontend authentication

Frontend authentication was very intimidating from the material provided. I decided to take some time to review all the recordings and cookbooks before implementing the feature.

I learned that some features can we very complicated at first, but researching documentation can make the experience easier.

## December 02, 2022
* Finishing up register form

I worked with Tanner to complete the register form for our application. After completion, we merged with the main branch and tested out the functionality.

We realized that the design of the form and all other components can come after we have basic functionality. It is important that the code works before you get into design.

## December 01, 2022
* Worked on creating register form

Today I worked with React to create a register form for users to sign up in our application. I referenced my old projects and material to implement a function component. I decided to create a very basic, but working form.

My form showed up on the browser as intended, but submitting the for was not working. I realized that the post url was incorrect and had to change it to successfully post the account information.

## November 30, 2022
* Reviewed React and front end development

I haven't touched React after my last project so I decided to review the material and learned more about React hooks.

I realized how out of touch I was with React so reviewing helped refresh my memory on front end development.

## November 29, 2022
* Test and merge work with main

Today I worked on testing my backend authentication code and merging with main branch. I was still unfamiliar with the process of merge requests so we talked about it with the group. I tested the accounts microservice using the FastAPI docs page. Registering new user, sign in, and logout was working with no errors.

I kept getting an error with merge requests and realized I had to enter my credit card information.

## November 28, 2022
* Completing backend authentication

Today I worked on the final parts of implementing backend authentication. I created an authentication.py file and followed the instruction from the material.

I was getting errors and then realized I needed a signing key in environment section of the docker-compose file. It uses this to create secure json web tokens.

## November 23, 2022
* Continued to work on backend authentication

I continued to work on implementing backend authentication. I worked on creating accounts router. The material provided was really helpful and guided me to finishing this task.

I wasn't sure what about the logistics of a token and after researching and reviewing, I was able to grasp the concept more clearly.

## November 22, 2022
* Worked on implementing backend authentication for the application

Today was the first day I attempted to implement backend authentication. I followed the instructions from the material and worked on creating account queries.

I forgot to include jwtdown-fastapi in my requirements file so that was a learning experience for me.

## November 21, 2022
* Reviewed previous material on backend authentication for FastAPI

I decided to review recordings and material on implementing authentication for the backend. I wasn't too comfortable on the topic because there was a lot of material to process in a short amount of time. Reviewing the material allowed me to grasp an understanding of the concepts and I felt more comfortable working on it the next day.

I learned that FastAPI does not have a built-in authentication feature like Django, so you have to implement it yourself. I am thankful that a practical tutorial is provided for us.

## November 18, 2022
* Worked on creating database table for accounts

I worked with Tanner to create a database table for holding account information. We wrote some SQL and we decided that accounts should have id, name, email, hashed password, and doctor pid.

Today I found out adding "UNIQUE" into the SQL statement prevents duplicate data. I had to add that in for the email and pid number, since both of those are unique to the user.

## November 17, 2022
* Worked on creating new microservice for accounts

I worked with Tanner to create a new microservice to separate accounts from our other API. We made some changes to the dockerfile.dev, docker-compose.yaml and main.py to get the FastAPI docs page working.

I learned that when using a relational database, you can add the command "-m migrations up" in the CMD line of the dockerfile.dev to have migrations run automatically. This was very useful as I didn't have to manually run migrations.

## November 16, 2022
* Reviewed previous material to grasp the concepts of FastAPI

Tanner and I decided to review previous material so that we had a better understanding of FastAPI. We decided it was a better approach to review first because we were so used to Django and the transition was going to be difficult.

After reviewing the FastAPI instructional videos, I started to see the similarities between the frameworks. However, FastAPI is very minimal and does not have features that Django provides, such as database creation.

## November 15, 2022
* Distributed work among group members

We went over everything that needed to be done and the timeline of our project. We looked over our api endpoints and wire frame to divide the work among our team. I was assigned to work on implementing authentication for the application.

After some research about authentication for FastAPI, I realized that the implementation was going to be more complicated than in Django.
