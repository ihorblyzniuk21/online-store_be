const { Basket, BasketDevice, Device } = require('../models');

class BasketService {
	async getBasket(id) {
		const basket = await Basket.findOne({
			where: { userId: id },
			include: [
				{
					model: BasketDevice,
					as: 'basket_devices',
					include: [
						{
							model: Device,
							as: 'device'
						}
					]
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

	async deleteBasketDevice(id) {
		const basketDevice = await BasketDevice.destroy({
			where: {id}
		})
		return basketDevice;
	}
}

module.exports = new BasketService();