const express = require('express');
const { dbAction } = require("../../utilities/dbHelper");
const router = express.Router();

router.post('/', async (req, res) => {
    const newGroup = {
        name: req.body.name
    }

    const sql = 'INSERT INTO groups(name) VALUES(?)';
    const dbResult = await dbAction(sql, [newGroup.name]);
    if (dbResult === false) {
        return res.status(500).send({ error: 'something went wrong' });
    }

    res.json({msg: 'group successfully created', dbResult });
});

module.exports = router;