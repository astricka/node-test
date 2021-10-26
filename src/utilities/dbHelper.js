const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const dbAction = async (sql, data = []) => {
    try {
        const con = await mysql.createConnection(dbConfig);
        const [result] = await con.execute(sql, data);
        await con.end();
        return result;
    } catch (error) {
        console.log('dbAction error', error.message);
        return error.message;
    }
};

module.exports = {
    dbAction,
};
