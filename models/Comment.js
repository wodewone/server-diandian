module.exports = {
    name: 'Comment',
    schema: {
        uuid: String,
        username: String,
        password: String,
        createdTime: { type: Date, default: Date.now },
    },
};
