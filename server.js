const mysql = require('mysql2');
const app = require("./app");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const port = process.env.PORT || 5011;

// Create MySQL database connection
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.listen(port, () => {
    console.log(`Hola Server is running on http://localhost:${port}`);
});
