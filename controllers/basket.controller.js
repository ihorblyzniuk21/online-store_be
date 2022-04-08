const BasketService = require('../services/basket.service');

class BasketController {
	async getBasket(req, res) {
		try {
			const { id } = req.query;
			const basket = await BasketService.getBasket(id);
			return res.json(basket);
		} catch (e) {
			console.log(e);
		}
	}

	async createBasketDevice(req, res) {
		try {
			const basketDevice = await BasketService.createBasketDevice(req.body);
			return res.json(basketDevice);
		} catch (e) {
			console.log(e);
		}
	}

	async getBasketDevicesById(req, res) {
		try {
			const basketDevices = await BasketService.getBasketDevicesById(req.body);
			return res.json(basketDevices);
		} catch (e) {
			console.log(e)
		}
	}

	async deleteBasketDevice(req, res) {
		try {
			const { id } = req.query;
			const basketDevice = await BasketService.deleteBasketDevice(id)
			return res.json(basketDevice);
		} catch (e) {
			console.log(e)
		}
	}
}


module.exports = new BasketController();