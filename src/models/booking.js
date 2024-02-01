'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Allcode, {foreignKey: 'statusId', targetKey: 'keyMap', as: 'statusData'});
      Booking.belongsTo(models.Allcode, {foreignKey: 'methodPaymentId', targetKey: 'keyMap', as: 'methodPaymentData'});
      Booking.belongsTo(models.Allcode, {foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceDataBooking'});
      Booking.belongsTo(models.Allcode, {foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData'});
      Booking.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
      Booking.belongsTo(models.Patient, { foreignKey: 'patientId' });

    }
  }
  Booking.init({
    statusId: DataTypes.STRING,
    objectExamine: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    methodPaymentId: DataTypes.STRING,
    priceId: DataTypes.STRING,
    date: DataTypes.DATE,
    timeType: DataTypes.STRING,
    reasonExamine: DataTypes.STRING,
    verifyToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};