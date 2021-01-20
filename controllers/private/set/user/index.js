const { ServiceUser } = require('services');

module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
    } else {
        const { data: uuid } = jwtData;
        const { body } = ctx.request;
        const user = await ServiceUser.find({ uuid });
        if (user) {
            await ServiceUser.update({ uuid }, body);
        } else {
            await ServiceUser.create({ uuid, ...body });
        }
        ctx.result = {};
    }
    return next();
};
