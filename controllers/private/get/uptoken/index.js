const { qiniu: { access, secret } } = require('config');
const qiniu = require('qiniu');
const { qiniu: { cdnUrl: domain } } = require('config');

module.exports = (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: scope } = jwtData;
    const mac = new qiniu.auth.digest.Mac(access, secret);

    const options = {
        scope,
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac);
    ctx.result = {
        token,
        domain,
    };
    return next();
};
