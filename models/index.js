const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('../lib/mongoDB')();

const models = {};
// 整合models文件下的其他js文件
fs.readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js')).forEach((file) => {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const modelFile = require(path.join(__dirname, file));
        const schema = new mongoose.Schema(modelFile.schema);
        models[modelFile.name] = mongoose.model(modelFile.name, schema, modelFile.name);
    });
module.exports = models;
