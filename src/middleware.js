const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

async function isLoggedIn(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
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