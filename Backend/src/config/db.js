require('dotenv').config()
const { Pool } = require('pg')
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } = process.env

const DB = new Pool(
    {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        port: DB_PORT,
        allowExitOnIdle: true
    }
)

module.exports = {
    DB
}