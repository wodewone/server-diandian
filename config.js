const path = require('path');

const database = {
    main: 'yueer',
};
module.exports = {
    wx: {
        appid: 'wxdccdda64c1ed48ec',
        secret: 'acec92a99505324b6d10e655a7c4711b',
    },
    port: '3001',
    secret: 'cynthia',
    publicDir: path.resolve(__dirname, './public'),
    logPath: path.resolve(__dirname, './logs/app.log'),
    mongoDB: {
        origin: 'mongodb+srv',
        database: database.main,
        username: 'root',
        password: 'root',
        host: 'huobi.l4yiu.mongodb.net',
        port: 27017,
    },
    mongoUrl: `mongodb+srv://root:root@huobi.l4yiu.mongodb.net/${database.main}?retryWrites=true&w=majority`,
};
