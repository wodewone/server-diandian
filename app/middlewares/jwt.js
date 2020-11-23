const kjwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const mjwt = kjwt({secret: config.secret});

module.exports = (ctx, next) => {
    try {
        if (typeof ctx.request.headers.authorization == 'string') {
            const token = ctx.request.headers.authorization.slice(7);
            ctx.jwtData = jwt.verify(token, consit.secret);
        } else {
            throw {code: 401, message: 'err: no authorization'}
        }
    } catch ({message = 'err'}) {
        throw {code: 401, message}
    }
    next()
};
