const { Photo } = require('models');

module.exports = {
    add(data) {
        return Photo.create(data);
    },
    filters(query, projection) {
        return Photo.find(query, projection);
    },
};
