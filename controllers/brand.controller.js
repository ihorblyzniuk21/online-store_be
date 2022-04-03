const BrandService = require('../services/brand.service')

class BrandController {
	async create(req, res) {
		try {
			const brand = await BrandService.create(req.body);
			return res.json(brand);
		} catch (e) {
			console.log(e);
		}
	}

	async getAll(req, res) {
		try {
			const brands = await BrandService.getAll();
			return res.json(brands);
		} catch (e) {
			console.log(e)
		}
	}
}


module.exports = new BrandController();