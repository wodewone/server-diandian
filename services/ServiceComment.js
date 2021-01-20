const { Comment } = require('models');

module.exports = {
    create(data) {
        return Comment.create(data);
    },
    filters(data, projection) {
        return Comment.find(data, projection);
    },
    find(data, projection) {
        return Comment.findOne(data, projection);
    },
    update(query, data) {
        return Comment.updateOne(query, data, { upsert: true });
    },
};
