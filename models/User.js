module.exports = {
    name: 'User',
    schema: {
        uuid: String,
        nickName: String,
        avatarUrl: String,
        city: String,
        province: String,
        country: String,
        language: String,
        gender: String,
        blessing: String,
        updatedTime: Date,
        createdTime: { type: Date, default: Date.now },
    },
};
