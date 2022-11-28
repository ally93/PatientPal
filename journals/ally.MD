## Nov 28, 2022
Today I worked on:

* making a patient form to show details of the patient in react



## Nov 24, 2022
Today I worked on:

* update patient form with nav completed





## Nov 23, 2022
Today I worked on:

* creating a delete button




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