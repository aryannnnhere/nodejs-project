'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(sequelize.models.Company, { foreignKey: 'companyId' });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    companyId: DataTypes.STRING,
    role: DataTypes.STRING,
    gender: DataTypes.STRING,
    publicKey:DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};