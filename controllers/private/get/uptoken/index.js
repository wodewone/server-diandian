const {
    qiniu: {
        access, secret, cdnUrl, personMax,
    },
} = require('config');
const qiniu = require('qiniu');
const md5 = require('md5');
const ServicePhoto = require('services/ServicePhoto');

module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: uuid } = jwtData;
    const mac = new qiniu.auth.digest.Mac(access, secret);
    const scope = md5(uuid);

    const options = {
        scope: `wodewone:${scope}`,
        expires: 7200,
        isPrefixalScope: 1,
        fsizeMin: 1024,
        fsizeLimit: 1024 * 1024 * 5,
        mimeLimit: 'image/jpeg;image/png;image/jpg',
        returnBody: '{"key":"$(key)","hash":"$(etag)","width":"$(imageInfo.width)","height":"$(imageInfo.height)"}',
    };
    const list = await ServicePhoto.filters({ uuid }) || [];
    const result = {
        max: personMax,
        url: cdnUrl,
        scope,
    };
    if (list.length >= personMax) {
        ctx.result = result;
    } else {
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const token = putPolicy.uploadToken(mac);
        ctx.result = {
            token,
            ...result,
        };
    }
    return next();
};
