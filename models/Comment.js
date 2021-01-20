module.exports = {
    name: 'Comment',
    schema: {
        uuid: String,
        text: String,
        time: Number,
        createdTime: { type: Date, default: Date.now },
    },
};
