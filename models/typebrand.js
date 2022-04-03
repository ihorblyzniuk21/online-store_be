'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeBrand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TypeBrand.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
    modelName: 'TypeBrand',
  });
  return TypeBrand;
};