module.exports = {
    name: 'Photo',
    schema: {
        uuid: String,
        key: String,
        hash: String,
        createdTime: { type: Date, default: Date.now },
    },
};
