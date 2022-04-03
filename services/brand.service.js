const { Brand } = require('../models');

class BrandService {
	async create(body) {
		console.log("BODY",body)
		const brand = await Brand.create(body);
		return brand;
	}

	async getAll() {
		const brands = await Brand.findAll();
		return brands;
	}
}

module.exports = new BrandService;