'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
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
    await queryInterface.dropTable('users');
  }
};
