const { qiniu: { access, secret } } = require('config');
const qiniu = require('qiniu');
const md5 = require('md5');
const { qiniu: { cdnUrl: domain } } = require('config');

module.exports = (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: userId } = jwtData;
    const mac = new qiniu.auth.digest.Mac(access, secret);
    const scope = md5(userId);

    const options = {
        scope: `wodewone:${scope}`,
        isPrefixalScope: 1,
        returnBody: '{"key":"$(key)","width":"$(imageInfo.width)","height":"$(imageInfo.height)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac);
    // const url = `${domain}/${scope}`;
    const url = domain;
    ctx.result = {
        token,
        url,
        scope,
    };
    return next();
};
