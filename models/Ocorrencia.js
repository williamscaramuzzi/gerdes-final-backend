const Sequelize = require('sequelize');

class Ocorrencia extends Sequelize.Model{
    static init(connection){
        super.init({ 
            despacho: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true, 
              allowNull: false
            }, 
            fato: {
              type: Sequelize.STRING,
              allowNull: false
            },
            //o atributo equipe é do tipo Equipe, então eu aviso o sequelize que esse atributo
            //referencia a coluna 'viatura' da tabela 'equipes'
            equipe: {
              type: Sequelize.STRING,
              allowNull: true,
              references: { model: 'equipes', key: 'viatura'}
            },
            endereco: {
              type: Sequelize.STRING,
              allowNull: false
            },
            solicitante: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            vitima: {
              type: Sequelize.STRING,
              allowNull: true
            },
            despachante_responsavel: {
              type: Sequelize.STRING,
              allowNull: false
            },
            descricao: {
              type: Sequelize.STRING,
              allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false
              }     
          }, {
              sequelize: connection
            });
    }
}
module.exports = Ocorrencia;