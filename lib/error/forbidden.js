const CodedError = require('./code');

module.exports = class ForbiddenError extends CodedError {
    constructor(message = '拒绝访问') {
        super(message, 403);
    }
};
