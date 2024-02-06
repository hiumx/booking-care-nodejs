'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinic.belongsTo(models.User, { foreignKey: 'doctorId' });
      Clinic.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'id', as: "priceData" });
      Clinic.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'id', as: "provinceData" });
      Clinic.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'id', as: "paymentData" });
      Clinic.hasMany(models.Markdown, { foreignKey: 'clinicId'});
    }
  }
  Clinic.init({
    doctorId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};