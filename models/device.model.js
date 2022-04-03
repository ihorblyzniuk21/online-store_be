'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Type, Brand, Rating, BasketDevice, DeviceInfo }) {
      Device.belongsTo(Type, {foreignKey: "typeId"});
      Device.belongsTo(Brand, {foreignKey: "brandId"});
      Device.hasMany(Rating, {foreignKey: "deviceId"});
      Device.hasMany(BasketDevice, {foreignKey: "deviceId"});
      Device.hasMany(DeviceInfo, {foreignKey: "deviceId", as: "info"});
    }
  }
  Device.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeId: {
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Types',
        key: 'id'
      },
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER
    },
    brandId: {
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Brands',
        key: 'id'
      },
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};