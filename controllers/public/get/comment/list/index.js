const { InvalidQueryError } = require('lib/error');
const { ServiceComment } = require('services');

module.exports = async (ctx, next) => {
    const { limit = 50 } = ctx.query;
    const min = 1;
    const max = 200;
    const size = +limit;
    if (size <= min || size >= max) {
        throw new InvalidQueryError(`limit 需为${min}-${max}内的整数`);
    }
    ctx.result = await ServiceComment.filters({}, { _id: 0, text: 1, time: 1 }).sort('time').limit(size);
    return next();
};
