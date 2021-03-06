const jwt = require('jsonwebtoken');
const config = require('config');
const { ServiceAccount } = require('services');
const { InvalidQueryError } = require('lib/error');

module.exports = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        throw new InvalidQueryError();
    }
    const user = await ServiceAccount.find({
        username,
        password,
    });
    if (!user) {
        ctx.result = null;
        ctx.msg = '用户名或密码错误';
    } else {
        const { uuid, _id: id } = user;
        const exp = Math.floor(Date.now() / 1000) + (60 * 60) * 24;
        ctx.result = jwt.sign({
            // eslint-disable-next-line no-underscore-dangle
            data: uuid || id,
            // 设置 token 过期时间
            exp,
        }, config.secret);
    }
    return next();
};
