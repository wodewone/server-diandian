const path = require('path');
const Router = require('koa-router');
const { makeRouter } = require('./utils');

const router = new Router();
router.prefix('/point/v1');

const routeRootPath = path.join(__dirname, '../controllers/public');
const routerList = makeRouter(routeRootPath);
console.group('%c🚀 Public Router');
console.table(routerList);
console.groupEnd();
routerList.forEach(([type, route, middleware]) => {
    router[type](route, middleware);
});

module.exports = router;
