'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeviceInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Device }) {
      DeviceInfo.belongsTo(Device, {foreignKey: "deviceId", as: "info"})
    }
  }
  DeviceInfo.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'DeviceInfo',
  });
  return DeviceInfo;
};