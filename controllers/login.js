const jwt = require('jsonwebtoken');
const config = require('../config');
const { user: userServices } = require('../services');
const { InvalidQueryError } = require('../lib/error');

module.exports = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        throw new InvalidQueryError();
    }
    const user = await userServices.login({
        username,
        password,
    });
    if (!user) {
        ctx.result = null;
        ctx.msg = '用户名或密码错误';
    } else {
        const token = jwt.sign({
            // eslint-disable-next-line no-underscore-dangle
            data: user._id,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
        }, config.secret);
        ctx.result = {
            token,
        };
    }
    return next();
};
