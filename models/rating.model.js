'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Device }) {
      Rating.belongsTo(User, { foreignKey: "userId" });
      Rating.belongsTo(Device, { foreignKey: "deviceId" });
    }
  }
  Rating.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER
    },
    deviceId: {
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Devices',
        key: 'id'
      },
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};