const bcrypt = require('bcryptjs');

function hashValue(plainValue) {
    return bcrypt.hashSync(plainValue, 10);
}

module.exports = {
    hashValue,
}