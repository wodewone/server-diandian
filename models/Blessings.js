module.exports = {
    name: 'Blessings',
    schema: {
        uuid: String,
        content: String,
        shareId: String,
        updatedTime: Date,
        createdTime: { type: Date, default: Date.now },
    },
};
