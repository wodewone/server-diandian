// https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html

const { InvalidQueryError } = require('lib/error');
const { wx: { appid } } = require('config');
const WXBizDataCrypt = require('plugins/WXBizDataCrypt');

module.exports = async (ctx, next) => {
    const { sessionKey, encryptedData, iv } = ctx.request.body;
    if (!sessionKey || !encryptedData || !iv) {
        throw new InvalidQueryError();
    }
    const pc = new WXBizDataCrypt(appid, sessionKey);
    ctx.result = pc.decryptData(encryptedData, iv);
    return next();
};
