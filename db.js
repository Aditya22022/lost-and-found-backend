const { Pool } = require("pg"); //import the Pool class from the pg module
require("dotenv").config(); // allows us to use environment variables from a .env file

// Setup PostgreSQL connection using .env variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;       // Makes the pool object available to other files.
                            //So in another file, like server.js, you can do:const pool = require("./db");
                             //pool.query("SELECT * FROM items", (err, res) => {
                            // do something with the data
                             // });