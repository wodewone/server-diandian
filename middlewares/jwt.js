const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

koaJwt({ secret });

module.exports = (ctx, next) => {
    // 将 token 中的数据解密后存到 ctx 中
    try {
        if (typeof ctx.request.headers.authorization === 'string') {
            const token = ctx.request.headers.authorization;
            ctx.jwtData = jwt.verify(token, secret);
        } else {
            // eslint-disable-next-line no-throw-literal
            throw { code: 401, message: 'no authorization' };
        }
    } catch (err) {
        // eslint-disable-next-line no-throw-literal
        throw { code: 401, message: err.message };
    }
    next();
};
