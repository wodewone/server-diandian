module.exports = {
    name: 'Account',
    schema: {
        uuid: String,
        username: String,
        password: String,
        createdTime: { type: Date, default: Date.now },
    },
};
