import { Client } from "pg";

const client = new Client({
    connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
});

// async function createusertable() {
//     await client.connect();
//     const res = await client.query(`
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `);
//     console.log("Hi", res);
// }
// createusertable();


// Create a function that let’s you insert data into a table. Make it async, make sure client.connect resolves before u do the insert

// This can be harmed by SQL Injections. As we are direclty passing the values given by user into the query. SQL will treat it as a query itself.
// async function insertDataIntoTable() {
//     try {
//         await client.connect();
//         const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username3', 'user5@example.com', 'user_password');";
//         const res = await client.query(insertQuery);
//         console.log(res);
        
//     } catch (error) {
//         console.log(error);
//     }
// }
// insertDataIntoTable();


// This will avoid SQL injction
async function insertData(username: string, email: string, password: string) {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'mysecretpassword',
    });
  
    try {
      await client.connect(); // Ensure client connection is established
      // Use parameterized query to prevent SQL injection
      const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
      const values = [username, email, password];
      const res = await client.query(insertQuery, values);
      console.log('Insertion success:', res); // Output insertion result
    } catch (err) {
      console.error('Error during the insertion:', err);
    } finally {
      await client.end(); // Close the client connection
    }
}

// Example usage
insertData('username5', 'user5@example.com', 'user_password').catch(console.error);


// Write a function getUser that lets you fetch data from the database given a email as input.

async function getUser(email: string) {
    try {
        await client.connect(); // Ensure client connection is established
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);

        if (result.rows.length > 0) {
          console.log('User found:', result.rows[0]); // Output user data
          return result.rows[0]; // Return the user data
        } else {
          console.log('No user found with the given email.');
          return null; // Return null if no user was found
        }
      } catch (err) {
        console.error('Error during fetching user:', err);
        throw err; // Rethrow or handle error appropriately
      } finally {
        await client.end(); // Close the client connection
      }
}


