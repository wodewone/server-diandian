const path = require('path');
const Router = require('koa-router');
const controllers = require('controllers');
const jwtMiddleware = require('middlewares/jwt');
const routerConfig = require('./utils');

const router = new Router();
router.prefix('/v1');
router.use(jwtMiddleware);

const routeRootPath = path.join(__dirname, './controllers/private');
const routerList = routerConfig(routeRootPath);

routerList.forEach(({ file, route }) => {
    try {
        const routePath = path.join(routeRootPath, file);
        // eslint-disable-next-line import/no-dynamic-require,global-require
        const middleware = require(routePath);
        router.get(route, middleware);
    } catch (e) {
        process.log.warn('router/index', e);
    }
});

router.get('/user', controllers.test.test);

module.exports = router;
