const { ServicePhoto } = require('services');
const { qiniu: { cdnUrl: domain } } = require('config');

module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: uuid } = jwtData;
    const { limit = 20, offset = 0 } = ctx.query;

    const keys = await ServicePhoto.filters({ uuid }, {
        _id: 0,
        key: 1,
        hash: 1,
        width: 1,
        height: 1,
    }).limit(+limit).skip(+offset);
    ctx.result = keys.map(({
        key, hash, width, height,
    }) => {
        const url = `${domain}/${key}`;
        return {
            key, hash, width, height, url,
        };
    });
    return next();
};
