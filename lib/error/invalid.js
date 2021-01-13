const CodedError = require('./code');

module.exports = class InvalidQueryError extends CodedError {
    constructor(message = '无效的参数') {
        super(message, 400);
    }
};
