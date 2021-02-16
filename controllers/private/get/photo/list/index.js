const { ServicePhoto } = require('services');
const { qiniu: { cdnUrl: domain } } = require('config');

module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: uuid } = jwtData;

    const keys = await ServicePhoto.filters({ uuid }, {
        _id: 0,
        key: 1,
        hash: 1,
    });
    ctx.result = keys.map(({ key, hash }) => ({
        hash,
        url: `${domain}/${key}`,
    }));
    return next();
};
