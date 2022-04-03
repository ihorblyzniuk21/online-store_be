'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Device, Type, TypeBrand}) {
      Brand.hasMany(Device, { foreignKey: "brandId" });
      Brand.belongsToMany(Type, { through: "TypeBrand", as: "brand", foreignKey: "brandId" })
    }
  }
  Brand.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};