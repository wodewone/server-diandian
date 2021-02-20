const { InvalidQueryError } = require('lib/error');
const { ServicePhoto } = require('services');
const { qiniu: { personMax } } = require('config');

module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
        return next();
    }
    const { data: uuid } = jwtData;
    const { list = [] } = ctx.request.body;
    if (!list || !list.length) {
        throw new InvalidQueryError();
    }
    const keys = await ServicePhoto.filters({ uuid }) || [];
    if (keys.length + list.length > personMax) {
        throw new InvalidQueryError('已经放不下这么多拉，先删掉一些再上传吧！');
    }
    const $list = list.reduce((so, o) => {
        if (o.hash) {
            so.push({ uuid, ...o });
        }
        return so;
    }, []);
    await ServicePhoto.add($list);
    ctx.result = {};
    return next();
};
