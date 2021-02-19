const { InvalidQueryError } = require('lib/error');
const { ServicePhoto } = require('services');

module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: uuid } = jwtData;
    const { list = [] } = ctx.request.body;
    if (!list || !list.length) {
        throw new InvalidQueryError();
    }
    await ServicePhoto.del({ hash: { $in: list }, uuid });
    ctx.result = {};
    return next();
};
