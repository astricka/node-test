require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_HOST,
    password: process.env.DB_HOST,
    port: process.env.DB_HOST,
    database: process.env.DB_DB
}

const port = process.env.SERVER_PORT;

module.exports = {
    dbConfig,
    port
};