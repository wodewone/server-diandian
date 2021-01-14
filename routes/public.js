const Router = require('koa-router');
const { login } = require('../controllers');

const router = new Router();
router.prefix('/api');

router.post('/login', login);

module.exports = router;
