'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      matricula: 101826021,
      nomecompleto: 'William Scaramuzzi Teixeira',
      nomedeguerra: 'William',
      postograd: "Capitão",
      senha: "e3e3e3",
      perfil: "despachante",
      unidade: "3º BPM",
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
