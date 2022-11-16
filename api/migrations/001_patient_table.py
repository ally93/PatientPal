steps= [
    [
        ## create a table
        """
        CREATE TABLE patients (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            birth_date DATE NOT NULL,
            email VARCHAR(1000) NOT NULL,
            address TEXT,
            gender VARCHAR(50) NOT NULL,
        );
        """,

        ##drop the table
        """
        DROP TABLE patients;
        """
    ]
]