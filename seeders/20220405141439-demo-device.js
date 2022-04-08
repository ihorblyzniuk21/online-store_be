'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Devices', [
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 1,
            brandId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 1,
            brandId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 1,
            brandId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 2,
            brandId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 1,
            brandId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 1,
            brandId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 3,
            brandId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 2,
            brandId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 4,
            brandId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 4,
            brandId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 3,
            brandId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 2,
            brandId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 1,
            brandId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 1,
            brandId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 1,
            brandId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 2,
            brandId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 4,
            brandId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 3,
            brandId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 4,
            brandId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            name: faker.name.findName(),
            price: faker.finance.amount(),
            rating: null,
            img: faker.image.avatar(),
            typeId: 4,
            brandId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Devices', null, {});
  }
};
