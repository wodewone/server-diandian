const { Greeting } = require('models');

module.exports = {
    create(data) {
        return Greeting.create(data);
    },
    filters(data, projection) {
        return Greeting.find(data, projection);
    },
    find(data, projection) {
        return Greeting.findOne(data, projection);
    },
    update(query, data) {
        return Greeting.updateOne(query, data);
    },
};
