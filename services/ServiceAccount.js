const { Account: ServiceAccount } = require('models');

module.exports = {
    register(data) {
        return ServiceAccount.create(data);
    },
    find(data) {
        return ServiceAccount.findOne(data);
    },
};
