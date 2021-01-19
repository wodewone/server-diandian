const { ServiceAccount } = require('services');
const { InvalidQueryError } = require('lib/error');

module.exports = async (ctx, next) => {
    const { username, password, uuid = null } = ctx.request.body;
    if (!username || !password) {
        throw new InvalidQueryError();
    }
    const user = await ServiceAccount.find({ username });
    if (user) {
        ctx.result = null;
        ctx.msg = '账户名已存在，请更换后重试';
        return next();
    }
    const resolve = await ServiceAccount.register({
        uuid,
        username,
        password,
    });
    if (resolve) {
        ctx.result = {};
        ctx.msg = '注册成功！';
    }
    return next();
};
