const { logger } = require('./logger');

// 这个middleware用于将ctx.result中的内容最终回传给客户端
// 回传的格式遵循这样的格式：{ code: 0, msg: any data: any, success: boolean }
const responseHandler = (ctx) => {
    if (ctx.result !== undefined) {
        ctx.type = 'json';
        const { msg = null, result = null } = ctx;
        ctx.body = {
            code: 200,
            data: result,
            msg,
            success: !!result,
        };
    }
};

// 这个middleware处理在其它middleware中出现的异常
// 并将异常消息回传给客户端：{ code: '错误代码', msg: '错误信息' }
const errorHandler = (ctx, next) => next().catch(({ stack, code, message }) => {
    if (code == null) {
        logger.error(stack);
    }
    ctx.body = {
        code: code || -1,
        data: null,
        msg: message.trim(),
        success: false,
    };

    ctx.status = 200; // 保证返回状态是 200, 这样前端不会抛出异常
    return Promise.resolve();
});

module.exports = {
    responseHandler,
    errorHandler,
};
