const fs = require('fs');
const path = require('path');

const checkValid = (_path) => fs.readdirSync(_path).find((file) => file.toLowerCase().endsWith('js'));

/**
 * 生成路由配置
 * @param dirPath
 * @returns {*[{path=routePath,route=routeName}]}
 */
const getRouterTree = (dirPath) => {
    const dir = fs.readdirSync(dirPath);
    return dir.reduce((so, file) => {
        const $path = path.join(dirPath, file);
        if (fs.statSync($path).isDirectory()) {
            const child = getRouterTree($path);
            const route = file.replace('_', ':');
            if (checkValid($path)) {
                so.push({ file, route });
            }
            if (child.length) {
                const pathList = child.map((next) => ({
                    file: `${file}/${next.file}`,
                    route: `${route}/${next.route}`,
                })).filter(({ file: _file }) => checkValid(path.join(dirPath, _file)));
                so.push(...pathList);
            }
        }
        return so;
    }, []);
};

/**
 * 遍历 dirPath 目录生成路由
 * @param dirPath
 * @returns {boolean|*[]}
 */
const routerConfig = (dirPath = __dirname) => {
    const dir = fs.readdirSync(dirPath);
    if (!dir || !dir.length) {
        return false;
    }
    return getRouterTree(dirPath);
};

module.exports = {
    routerConfig,
    makeRouter: (routeRootPath) => routerConfig(routeRootPath).reduce((so, { file, route }) => {
        try {
            const routePath = path.join(routeRootPath, file);
            // eslint-disable-next-line import/no-dynamic-require,global-require
            const middleware = require(routePath);
            if (typeof middleware !== 'function') {
                return so;
            }
            if (route.split('/')[0] === 'get') {
                so.push(['get', `/${route}`, middleware]);
            } else {
                so.push(['post', `/${route}`, middleware]);
            }
            return so;
        } catch (e) {
            console.warn('makeRouter', e);
            return so;
        }
    }, []),
};
