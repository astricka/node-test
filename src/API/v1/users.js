const express = require('express');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const { dbAction } = require("../../utilities/dbHelper");
const { hashValue, verifyHash } = require('../../utilities/hashHelper');

const router = express.Router();

const userSchema = joi.object({
    full_name: joi.string().alphanum().min(5).max(100).required(),
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().required(),
});

router.post('/register', async (req, res) => {
    let userData = {
        full_name: req.body.name,
        email: req.body.email,
        password: hashValue(req.body.password)
    }

    try {
        userData = await userSchema.validateAsync(userData);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Invalid credentials' });
    }

    const sql = `INSERT INTO users(full_name, email, password) VALUES(?,?,?)`;
    const dbResult = await dbAction(sql, [userData.full_name, userData.email, userData.password]);
    if (dbResult === false) {
        return res.status(500).json({ error: 'something went wrong' });
    }
    res.json({ msg: 'success', dbResult });
});

router.post('/login', async (req, res) => {
    let userData = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    const dbResult = await dbAction(sql, [userData.email]);

    if (dbResult.length !== 1) {
        return res.status(400).send({ error: 'Invalid credentials' });
    }

    if (!verifyHash(req.body.password, dbResult[0].password)) {
        return res.status(400).send({ error: 'bad credentials' });
    }

    res.json({ msg: 'login success', dbResult });
});

module.exports = router;