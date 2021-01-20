const { InvalidQueryError } = require('lib/error');
const { ServiceUser } = require('services');

module.exports = async (ctx, next) => {
    const { limit = 50 } = ctx.query;
    const min = 1;
    const max = 200;
    const size = +limit;
    if (size <= min || size >= max) {
        throw new InvalidQueryError(`limit 需为${min}-${max}内的整数`);
    }
    ctx.result = await ServiceUser.filters({ blessing: { $gt: 50 } }, { _id: 0, avatarUrl: 1, blessing: 1 }).limit(size);
    return next();
};
