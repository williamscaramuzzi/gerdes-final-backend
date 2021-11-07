'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipes', { 
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
      },
      created_at:{
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
     await queryInterface.dropTable('equipes');
     
  }
};
