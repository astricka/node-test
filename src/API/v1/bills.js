const express = require('express');
const { dbAction } = require("../../utilities/dbHelper");
const router = express.Router();

router.post('/', async (req, res) => {
    const data = req.body;
    const sql = 'INSERT INTO bills(group_id, amount, description) VALUES(?,?,?)'
    const dbResult = await dbAction(sql, Object.values(data));
    if (dbResult === false) {
        return res.status(500).send({ error: 'something went wrong' });
    }
    res.json({ msg: 'Added bill', dbResult });
});

router.get('/:id', async (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM bills WHERE group_id = ?`
    const dbResult = await dbAction(sql, id);
    if (dbResult === false) {
        return res.status(400).send({ error: 'Something went wrong' });
    }
    res.send({msg: 'Success', dbResult });
});
module.exports = router;