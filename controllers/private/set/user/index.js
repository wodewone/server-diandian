const { ServiceUser } = require('services');

module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
    } else {
        const { data: uuid } = jwtData;
        const { body } = ctx.request;
        await ServiceUser.create({ uuid }, body);
        ctx.result = {};
        ctx.msg = 'yes';
    }
    console.info(11, ctx);
    return next();
};
