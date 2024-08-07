'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Censor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post_Censor.init({
    post_id: DataTypes.INTEGER,
    censor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post_Censor',
  });
  return Post_Censor;
};