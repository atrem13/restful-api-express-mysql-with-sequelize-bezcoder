const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
                    dbConfig.DB, 
                    dbConfig.USER, 
                    dbConfig.PASSWORD, 
                    {
                      host:dbConfig.HOST,
                      dialect:dbConfig.dialect,
                      operatorAliases:false,
                      
                      poll: {
                        max:dbConfig.pool.max,
                        min:dbConfig.pool.min,
                        acquire:dbConfig.pool.acquire,
                        idle:dbConfig.pool.idle
                      }
                    });

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// get model
db.tutorial = require('./tutorial.model.js')(sequelize, Sequelize);

module.exports = db;