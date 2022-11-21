steps= [
    [
        ## create a table
        """
        CREATE TABLE questionnaires (
            id SERIAL PRIMARY KEY NOT NULL,
            medications VARCHAR(10000),
            surgeries VARCHAR(10000),
            concerns VARCHAR(10000),
            weight SMALLINT,
            blood_pressure VARCHAR(50),
            date DATE,
            patient_id INTEGER NOT NULL REFERENCES patients(id)

        );
        """,

        ##drop the table
        """
        DROP TABLE questionnaires;
        """
    ]
]
