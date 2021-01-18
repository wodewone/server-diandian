const path = require('path');
const Router = require('koa-router');
const jwtMiddleware = require('middlewares/jwt');
const { makeRouter } = require('./utils');

const router = new Router();
router.prefix('/v1');
router.use(jwtMiddleware);

const routeRootPath = path.join(__dirname, '../controllers/private');
const routerList = makeRouter(routeRootPath);
console.group('%c🚀 Private Router');
console.table(routerList);
console.groupEnd();
routerList.forEach(([type, route, middleware]) => {
    router[type](route, middleware);
});

module.exports = router;
