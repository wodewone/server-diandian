const mongoose = require('mongoose');
const { mongoUrl, mongoDB } = require('../config');

const connectDB = () => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).catch((e) => e);
    const db = mongoose.connection;
    const dbName = mongoDB.database;
    db.on('connected', () => {
        // eslint-disable-next-line no-console
        console.log(`[${dbName}] Connecting database successfully`);
    });

    db.on('error', () => {
        // eslint-disable-next-line no-console
        console.log(`[${dbName}] Failed to connect to database`);
    });

    db.on('disconnected', () => {
        // eslint-disable-next-line no-console
        console.log(`[${dbName}] Closed to connect to database`);
    });
};
module.exports = connectDB;
