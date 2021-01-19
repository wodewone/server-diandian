const axios = require('axios');
const { InvalidQueryError, CodedError } = require('lib/error');
const { wx } = require('config');

module.exports = async (ctx, next) => {
    const { code } = ctx.request.body;
    if (!code) {
        throw new InvalidQueryError();
    }
    const { appid, secret } = wx;
    const { data } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
            appid,
            secret,
            js_code: code,
            grant_type: 'authorization_code',
        },
    });
    const { errmsg, errcode } = data;
    if (errcode) {
        throw new CodedError(errmsg, errcode);
    }
    ctx.result = data;
    return next();
};
