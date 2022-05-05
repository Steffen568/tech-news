// import sequelize constructor from lib
const Sequelize = require('sequelize');
// import dotenv
require('dotenv').config()

// create connection to our database pass in mysql info for username/password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    post: 3306
});

module.exports = sequelize; 