module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    const { data: uid } = jwtData;
    if (!jwtData.data) {
        ctx.result = jwtData;
    } else {
        ctx.result = { uid };
    }
    return next();
};
