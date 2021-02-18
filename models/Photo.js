module.exports = {
    name: 'Photo',
    schema: {
        uuid: String,
        key: String,
        hash: String,
        width: Number,
        height: Number,
        createdTime: { type: Date, default: Date.now },
    },
};
