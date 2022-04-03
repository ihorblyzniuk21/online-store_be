'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      Token.belongsTo(User, {foreignKey: "userId", as: "user"});
    }
  }
  Token.init({
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
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};