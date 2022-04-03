const TypeService = require('../services/type.service');

class TypeController {
	async create(req, res) {
		try {
			const type = await TypeService.create(req.body);
			return res.json(type);
		} catch (e) {
			console.log(e);
		}
	}

	async getAll(req, res) {
		try {
			const types = await TypeService.getAll();
			return res.json(types);
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new TypeController();