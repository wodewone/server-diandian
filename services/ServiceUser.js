const { User } = require('models');

module.exports = {
    userinfo(data) {
        return User.findOne(data);
    },
    create(query, data) {
        return User.updateOne(query, data, { upsert: true });
    },
};
