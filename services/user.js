const { user: User } = require('../models');

module.exports = {
    login(userData) {
        return User.findOne(userData);
    },
};
