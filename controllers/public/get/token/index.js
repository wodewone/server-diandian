const jwt = require('jsonwebtoken');
const config = require('config');
const { InvalidQueryError } = require('lib/error');

module.exports = async (ctx, next) => {
    const { id } = ctx.query;
    if (!id) {
        throw new InvalidQueryError();
    }
    const exp = Math.floor(Date.now() / 1000) + (60 * 60) * 24;
    ctx.result = jwt.sign({
        data: id,
        exp,
    }, config.secret);
    return next();
};
