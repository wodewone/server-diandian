const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const { CodedError } = require('lib/error');
const { secret } = require('config');

koaJwt({ secret });

module.exports = (ctx, next) => {
    // 将 token 中的数据解密后存到 ctx 中
    try {
        if (typeof ctx.request.headers.authorization === 'string') {
            const token = ctx.request.headers.authorization;
            ctx.jwtData = jwt.verify(token, secret);
        } else {
            throw new CodedError('no authorization', 401);
        }
    } catch ({ message }) {
        throw new CodedError(message, 401);
    }
    next();
};
