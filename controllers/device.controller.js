const DeviceService = require('../services/device.service');

class DeviceController {
	async create(req, res) {
		try {
			const device = await DeviceService.create(req.body, req.files);
			return res.json(device);
		} catch (e) {
			console.log(e)
		}
	}

	async getAll(req, res) {
		try {
			const devices = await DeviceService.getAll(req.query);
			return res.json(devices);
		} catch (e) {
			console.log(e)
		}
	}

	async getOne(req, res) {
		const { id } = req.params;
		const device = await DeviceService.getOne(id)
		return res.json(device)
	}
}

module.exports = new DeviceController;