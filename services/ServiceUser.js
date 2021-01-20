const { User } = require('models');

module.exports = {
    create(data) {
        return User.create(data);
    },
    update(query, data) {
        return User.updateOne(query, {
            ...data,
            updatedTime: Date.now(),
        });
    },
    find(query, projection) {
        return User.findOne(query, projection);
    },
    filters(query, projection) {
        return User.find(query, projection);
    },
};
