const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static init(connection){
        super.init({ 
            matricula: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true, 
              allowNull: false
            }, 
            nomecompleto: {
              type: Sequelize.STRING,
              allowNull: false
            },
            nomedeguerra: {
              type: Sequelize.STRING,
              allowNull: false
            },
            postograd: {
              type: Sequelize.STRING,
              allowNull: false
            },
            senha: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            perfil: {
              type: Sequelize.STRING,
              allowNull: false
            },
            unidade: {
              type: Sequelize.STRING,
              allowNull: false
            }     
          }, {
              sequelize: connection
            });
    }
}
module.exports = User;