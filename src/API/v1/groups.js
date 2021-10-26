const express = require('express');
const { dbAction } = require("../../utilities/dbHelper");
const { isLoggedIn } = require("../../middleware");
const router = express.Router();

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.user.id);
    const sql = 'INSERT INTO groups(name) VALUES(?)';
    const dbResult = await dbAction(sql, Object.values(data));
    if (dbResult === false) {
        return res.status(500).send({ error: 'something went wrong' });
    }
    res.json({msg: 'group successfully created', dbResult });
});

module.exports = router;