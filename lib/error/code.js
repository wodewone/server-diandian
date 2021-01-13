module.exports = class CodedError extends Error {
    constructor(message = '未知错误', code = -1) {
        super(message);
        this.code = code;
    }
};
