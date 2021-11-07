'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ocorrencia', { 
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
      equipe: {
          type: Sequelize.STRING,
          allowNull: true,
          references: { model: 'equipes', key: 'viatura'}
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: true
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
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }      
     });
     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ocorrencia');
     
  }
};
