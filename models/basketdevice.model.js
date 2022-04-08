'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BasketDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Basket, Device }) {
      BasketDevice.belongsTo(Basket, {foreignKey: "basketId" , as: 'basket_devices'});
      BasketDevice.belongsTo(Device, {foreignKey: "deviceId", as: 'device'});
    }
  }
  BasketDevice.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    basketId: {
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Baskets',
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
    modelName: 'BasketDevice',
  });
  return BasketDevice;
};