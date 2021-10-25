const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware');

router.post('/', isLoggedIn, (req, res) => {
    console.log(req.user);
    const sql = 'INSERT INTO accounts(group_id, user_id) VALUES(?,?)'
    res.send('route');
});

module.exports = router;