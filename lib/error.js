const CodedError = require('./error/code');
const ForbiddenError = require('./error/forbidden');
const InvalidQueryError = require('./error/invalid');

module.exports = {
    CodedError,
    /**
   * 拒绝访问构造函数
   */
    ForbiddenError,
    /**
   * 无效的参数构造函数
   */
    InvalidQueryError,
};
