const fs = require('fs');

const files = fs.readdirSync(__dirname).filter((file) => file !== 'index.js');
module.exports = files.reduce((so, file) => {
    if (file.toLowerCase().endsWith('js')) {
        const param = `${file.replace(/\.js/, '')}`;
        // eslint-disable-next-line global-require,import/no-dynamic-require,no-param-reassign
        so[param] = require(`./${file}`);
    }
    return so;
}, {});
