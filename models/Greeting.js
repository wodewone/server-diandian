module.exports = {
    name: 'Greeting',
    schema: {
        uuid: String,
        content: String,
        createdTime: { type: Date, default: Date.now },
        updatedTime: Date,
    },
};
