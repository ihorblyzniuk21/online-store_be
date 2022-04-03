const { Type } = require('../models');

class TypeService {
	async create(body) {
		const type = await Type.create(body);
		return type;
	}

	async getAll() {
		const types = await Type.findAll();
		return types;
	}
}

module.exports = new TypeService();