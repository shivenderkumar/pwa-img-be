const mysql = require("mysql2/promise");
require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const connection = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    connectionLimit: 10,

    typeCast: function castField(field, useDefaultTypeCasting) {

        if ((field.type === "BIT") && (field.length === 1)) {
            var bytes = field.buffer();
            return (bytes[0] === 1);
        }

        return (useDefaultTypeCasting());
    }
})

module.exports = connection;