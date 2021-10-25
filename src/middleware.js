const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

async function isLoggedIn(req, res, next) {
    try {
        console.log(req.headers.authorizations)
        const token = req.headers.authorizations.split(" ")[1];
        req.user = jwt.verify(token, jwtSecret);
        console.log(req.user)
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Invalid token' });
    }
}

module.exports = {
    isLoggedIn,
};