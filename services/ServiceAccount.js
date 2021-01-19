const { Account } = require('models');

module.exports = {
    register(data) {
        return Account.create(data);
    },
    find(data) {
        return Account.findOne(data);
    },
};
