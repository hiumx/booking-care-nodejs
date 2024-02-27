'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class package_digital_conversion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  package_digital_conversion.init({
    primaryColor: DataTypes.STRING,
    title: DataTypes.STRING,
    cost: DataTypes.STRING,
    description: DataTypes.STRING,
    features: DataTypes.STRING,
    intendedFor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'package_digital_conversion',
  });
  return package_digital_conversion;
};