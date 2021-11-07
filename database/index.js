const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Ocorrencia = require('../models/Ocorrencia');
const User = require('../models/User');
const Equipe = require('../models/Equipe');

const connection = new Sequelize(dbConfig);
User.init(connection);
Equipe.init(connection);
Ocorrencia.init(connection);

module.exports = connection;