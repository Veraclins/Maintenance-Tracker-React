const prepTablesQuery = `
    DROP TABLE IF EXISTS requests;
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
      id SERIAL PRIMARY KEY, 
      first_name VARCHAR NOT NULL, 
      last_name VARCHAR NOT NULL, 
      email VARCHAR NOT NULL UNIQUE, 
      password VARCHAR NOT NULL, 
      role VARCHAR NOT NULL DEFAULT 'User',
      created_at TIMESTAMP DEFAULT NOW(), 
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE requests(
      id SERIAL, 
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR NOT NULL, 
      device VARCHAR NOT NULL, 
      description TEXT NOT NULL, 
      status status DEFAULT 'pending', 
      created_at TIMESTAMP DEFAULT NOW(), 
      updated_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (id, user_id)
    );
    
    INSERT INTO users (first_name, last_name, email, password, role) VALUES
    ('Agada', 'Clinton', 'clinton@test.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'Admin'),
    ('Agada', 'Innocent', 'innocent@test.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'User'),
    ('Anthony', 'Solomon', 'solomon@test.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'User'),
    ('Godwin', 'Andrew', 'andrew@test.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'User'),
    ('Veraclins', 'Veracity', 'admin@admin.com', '$2b$08$7Eag5c9WgbiM7RQBM7mcaOTAJo.CXp5SeYsxSCgu2evrhUH1Xzney', 'Admin')
    RETURNING id;

    INSERT INTO requests (user_id, title, device, description) VALUES
    (2, 'Faulty Cooling Fan', 'Desktop', 'The quarterly routine maintenance service for the Sharp S300 scanner is long overdue and necessary in order to forestall total breakdown'),
    (2, 'Browsers Crash Always', 'Laptop', 'The quarterly routine maintenance service for the Elepaq 3.5KVA Generator is long overdue and necessary in order to forestall total breakdown. The love of the lord is the beginning of wisdom.'),
    (2, 'Screen Problems', 'Tablet', 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (2, 'Routine Maintenance', 'Smartphone', 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (2, 'Routine Maintenance', 'Laptop', 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (3, 'Intermitent freezing of apps', 'Smartphone', 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (4, 'Routine Maintenance', 'Desktop', 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (3, 'Routine Maintenance', 'Tablet', 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (3, 'Faulty Touch Pad', 'Smartphone', 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (3, 'Routine Maintenance', 'Smartphone', 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.'),
    (2, 'Battery Problem', 'Laptop', 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.')
    RETURNING id;`;

export default prepTablesQuery;
