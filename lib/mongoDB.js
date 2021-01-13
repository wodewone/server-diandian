const mongoose = require('mongoose');
const { mongoUrl } = require('../config');

const connectDB = async () => {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', () => {
        console.log(`${mongoUrl} Connecting database successfully`);
    });

    mongoose.connection.on('error', () => {
        console.log(`${mongoUrl} Failed to connect to database`);
    });

    mongoose.connection.on('disconnected', () => {
        console.log(`${mongoUrl} Closed to connect to database`);
    });
};
module.exports = connectDB;
