const { Photo } = require('models');

module.exports = {
    add(data) {
        return Photo.create(data);
    },
    del(query) {
        return Photo.deleteMany(query);
    },
    filters(query, projection) {
        return Photo.find(query, projection);
    },
};
