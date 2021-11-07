const Sequelize = require('sequelize');

class Equipe extends Sequelize.Model{
    static init(connection){
        super.init({ 
          viatura: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
          }, 
          comandante: {
            type: Sequelize.STRING,
            allowNull: false
          },
          motorista: {
            type: Sequelize.STRING,
            allowNull: false
          },
          patrulheiro1: {
            type: Sequelize.STRING,
            allowNull: true
          },
          patrulheiro2: {
            type: Sequelize.STRING,
            allowNull: true
          },
          status: {
            type: Sequelize.ENUM("disponivel", "ocupada"),
            allowNull: false
          }    
          }, {
              sequelize: connection
            });
    }
}
module.exports = Equipe;