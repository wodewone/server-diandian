const { ServiceUser } = require('services');

module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
    } else {
        const { data: uuid } = jwtData;
        const user = await ServiceUser.find({ uuid }, {
            _id: 0,
            __v: 0,
        });
        ctx.result = user;
    }
    return next();
};
