const path = require('path');

const database = {
    main: 'yueer',
};
module.exports = {
    port: '3001',
    secret: 'secret',
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
