const { Account, UserInfo } = require('models');

module.exports = {
    login(data) {
        return Account.findOne(data);
    },
    UserInfo(data) {
        return UserInfo.findOne(data);
    },
};
