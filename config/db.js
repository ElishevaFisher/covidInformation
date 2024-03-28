const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Elisheva1234",
  database: "covid_info",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to db:", err);
    return;
  }
  console.log("Connected to DB.");
});

connection.query("SELECT * FROM users", (error, results, fields) => {
  if (error) {
    console.error("Error executing test query:", error);
    return;
  }
  console.log("Test query results:", results);
});

module.exports = connection;
