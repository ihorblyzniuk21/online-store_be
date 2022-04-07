'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, BasketDevice }) {
      Basket.belongsTo(User, {foreignKey: "userId", as: "basket"});
      Basket.hasMany(BasketDevice, {foreignKey: "basketId", as: 'basket_devices'});
    }
  }
  Basket.init({
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
    }
  }, {
    sequelize,
    modelName: 'Basket',
  });
  return Basket;
};