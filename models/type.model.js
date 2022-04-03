'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Device, Brand, TypeBrand }) {
      Type.hasMany(Device, { foreignKey: "typeId" });
      Type.belongsToMany(Brand, { through: "TypeBrand", as: "type", foreignKey: "typeId", })
    }
  }
  Type.init({
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
    modelName: 'Type',
  });
  return Type;
};