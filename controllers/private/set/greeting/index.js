const { InvalidQueryError } = require('lib/error');
const { ServiceGreeting } = require('services');

module.exports = async (ctx, next) => {
    const { content } = ctx.request.body;
    if (!content) {
        throw new InvalidQueryError();
    }
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: uuid } = jwtData;
    const one = await ServiceGreeting.find({ uuid });
    if (one) {
        if (one.content === content) {
            throw new InvalidQueryError('请勿提交重复的数据');
        }
        await ServiceGreeting.update({ uuid, content, updatedTime: Date.now() });
    } else {
        await ServiceGreeting.create({ uuid, content });
    }
    ctx.result = {};
    return next();
};
