'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TypeBrands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeId: {
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Types',
          key: 'id'
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      brandId: {
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Brands',
          key: 'id'
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TypeBrands');
  }
};