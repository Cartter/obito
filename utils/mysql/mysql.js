const mysql = require('mysql');
const log = require("../others/logs.js");

module.exports = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT)
})
log.good("Sucessful connection")
