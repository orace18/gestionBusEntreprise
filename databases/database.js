const mysql = require('mysql');
const dbConfig = require('./dbConfig');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

module.exports = pool;
