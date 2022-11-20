## Nov 18, 2022
Today we learnt about:

Authentication



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