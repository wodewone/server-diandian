const { InvalidQueryError } = require('lib/error');
const { ServiceComment } = require('services');

module.exports = async (ctx, next) => {
    const { text, time } = ctx.request.body;
    if (!text || !time) {
        throw new InvalidQueryError();
    }
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: uuid } = jwtData;
    const comment = await ServiceComment.find({ uuid, text, time });
    if (comment) {
        throw new InvalidQueryError('请勿提交重复的数据');
    }
    await ServiceComment.create({ uuid, text, time });
    ctx.result = {};
    return next();
};
