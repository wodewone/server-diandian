const { ServiceUser } = require('services');

module.exports = async (ctx, next) => {
    const { jwtData } = ctx;
    if (!jwtData.data) {
        ctx.result = jwtData;
    } else {
        const { data: uuid } = jwtData;
        const { body } = ctx.request;
        const user = await ServiceUser.find({ uuid });
        // > userid = db.ids.findAndModify({update:{$inc:{'id':1}}, query:{"name":"user"}, new:true}); { "_id" : ObjectId("4c637dbd900f00000000686c"), "name" : "user", "id" : 1 }
        if (user) {
            await ServiceUser.update({ uuid }, body);
        } else {
            await ServiceUser.create({ uuid, ...body });
        }
        ctx.result = {};
    }
    return next();
};
