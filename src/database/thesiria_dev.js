const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    database: process.env.DATABASE,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS
})

module.exports = pool.promise()