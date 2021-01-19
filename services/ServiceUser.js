const { User } = require('models');

module.exports = {
    create(query, data) {
        return User.updateOne(query, data, { upsert: true });
    },
    find(data, projection) {
        return User.findOne(data, projection);
    },
};
