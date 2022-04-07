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
			const brand = await BasketService.createBasketDevice(req.body);
			return res.json(brand);
		} catch (e) {
			console.log(e);
		}
	}

	async getBasketDevicesById(req, res) {
		try {
			const brands = await BasketService.getBasketDevicesById(req.body);
			return res.json(brands);
		} catch (e) {
			console.log(e)
		}
	}
}


module.exports = new BasketController();