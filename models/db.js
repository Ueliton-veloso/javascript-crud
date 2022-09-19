const Sequelize = require("sequelize");

//conectar o banco de dados
const sequelize = new Sequelize('database', 'username', 'password', {

    host: 'localhost',
    dialect: 'mysql',
});

module.exports = { Sequelize, sequelize }
