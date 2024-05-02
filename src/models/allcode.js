'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' });
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
            
            Allcode.hasMany(models.Clinic, { foreignKey: 'priceId', as: 'priceData' });
            Allcode.hasMany(models.Clinic, { foreignKey: 'provinceId', as: 'provinceData' });
            Allcode.hasMany(models.Clinic, { foreignKey: 'paymentId', as: 'paymentData' });
            
            Allcode.hasMany(models.Booking, { foreignKey: 'priceId', as: 'priceDataBooking' });
            Allcode.hasMany(models.Booking, { foreignKey: 'methodPaymentId', as: 'methodPaymentData' });
            Allcode.hasMany(models.Booking, { foreignKey: 'statusId', as: 'statusData' });
            Allcode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeTypeData' });

            Allcode.hasMany(models.Patient, { foreignKey: 'gender', as: 'genderDataPatient' });

        }
    }
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};