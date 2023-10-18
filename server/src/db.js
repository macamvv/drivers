require("dotenv").config();
const { Sequelize } = require("sequelize");

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const DriverModel = require('./models/Driver')
const TeamModel = require('./models/Team')

//CONECTA A LA DB
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, {logging: false});

// POR PRIMERA VEZ CREA LAS TABLAS
DriverModel(sequelize)
TeamModel(sequelize)
const { driver, team } = sequelize.models;
const DriverTeam = sequelize.define('driverTeam', {}, { timestamps: false });

driver.belongsToMany(team, { through: DriverTeam, foreignKey: 'driver_id'}) // el through es la tabla intermedia
team.belongsToMany(driver, {through: DriverTeam, foreignKey: 'team_id'})

module.exports = {
  ...sequelize.models, 
  conn: sequelize,   
};