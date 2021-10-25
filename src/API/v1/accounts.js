const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware');
const { dbAction } = require("../../utilities/dbHelper");

router.post('/', isLoggedIn, async (req, res) => {
    const data = {
        id: req.body.id,
        userId: req.user.id
    }
    const sql = `INSERT INTO accounts(group_id, user_id) VALUES(?,?)`
    const dbResult = await dbAction(sql, Object.values(data));
    if (dbResult === false) {
        return res.status(500).send({ error: 'something went wrong' });
    }

    res.json({ msg: 'Success', dbResult });
});

router.get('/', isLoggedIn, async (req, res) => {
    const sql = `SELECT accounts.group_id, groups.id, groups.name
    FROM accounts
    INNER JOIN groups
    ON accounts.group_id = groups.id
    WHERE accounts.user_id = ?`

    const dbResult = await dbAction(sql, [req.user.id]);
    if (dbResult === false) {
        return res.status(500).send({ error: 'something went wrong' });
    }
    res.json({ msg: 'Success', dbResult });
});

module.exports = router;