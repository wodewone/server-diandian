const { InvalidQueryError } = require('lib/error');
const { ServiceUser } = require('services');

module.exports = async (ctx, next) => {
    const { blessing, shareId } = ctx.request.body;
    if (!blessing) {
        throw new InvalidQueryError();
    }
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: uuid } = jwtData;
    const user = await ServiceUser.find({ uuid });
    if (user) {
        if (user.blessing === blessing) {
            throw new InvalidQueryError('请勿提交重复的数据');
        }
        await ServiceUser.update({ uuid }, { blessing });
        const { avatarUrl } = user;
        const userGreeting = { avatarUrl, uuid, blessing };
        ctx.result = userGreeting;
    }
    return next();
};
