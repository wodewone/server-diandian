const { Blessings } = require('models');

module.exports = {
    add(data) {
        return Blessings.create(data);
    },
    update(query, doc) {
        return Blessings.update(query, doc);
    },
    del(query) {
        return Blessings.deleteMany(query);
    },
    filters(query, projection) {
        return Blessings.find(query, projection);
    },
};
