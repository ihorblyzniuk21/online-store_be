const { Basket, BasketDevice } = require('../models');

class BasketService {
	async getBasket(id) {
		const basket = await Basket.findOne({
			where: { userId: id },
			include: [
				{
					model: BasketDevice,
					as: 'basket_devices'
				}
			]
		});
		return basket;
	}

	async createBasketDevice(body) {
		const basketDevice = await BasketDevice.create(body);
		return basketDevice;
	}

	async getBasketDevicesById(basketId) {
		const devices = await BasketDevice.findAll({
			where: {basketId}
		})
		return devices;
	}
}

module.exports = new BasketService();