const jwt = require('jsonwebtoken');
const config = require('../config');
const userServices = require('../services').user;
const { InvalidQueryError } = require('../lib/error');

const login = {};
login.login = async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    if (!userName || !password) {
        throw new InvalidQueryError();
    }
    const user = await userServices.login({
        userName,
        password,
    });
    if (!user) {
        ctx.result = '';
        ctx.msg = '用户不存在';
    } else {
        ctx.result = jwt.sign({
            // eslint-disable-next-line no-underscore-dangle
            data: user._id,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
        }, config.secret);
    }
    return next();
};

module.exports = login;
