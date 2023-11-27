'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies', // as the target table is "Companies"
        key: 'id', // as the target column is "id"
      },
    })
    .then(() => {
      return queryInterface.addColumn('Users', 'gender', {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['male', 'female']],
            msg: 'Gender must be "male" or "female"',
          },
        }
      });
    })
    .then(() => {
      return queryInterface.addColumn('Users', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['employee', 'sub-admin' , 'super-admin']],
            msg: 'Role must be "employee" , "super-admin" ,  or "admin"',
          },
        }
      });
    })
    .then(() => {
      return queryInterface.addColumn('Users', 'publicKey', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'companyId')
    .then(() => {
      return queryInterface.removeColumn('Users', 'gender');
    })
    .then(() => {
      return queryInterface.removeColumn('Users', 'role');
    })
    .then(() => {
      return queryInterface.removeColumn('Users', 'publicKey');
    });
  }
};
