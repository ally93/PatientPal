steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) NOT NULL UNIQUE,
            hashed_password VARCHAR(255) NOT NULL,
            pid INTEGER NOT NULL UNIQUE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ]
]
