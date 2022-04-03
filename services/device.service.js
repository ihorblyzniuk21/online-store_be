const path = require("path");
const uuid = require("uuid");


const { Device, DeviceInfo } = require('../models');

class DeviceService {
	async create(body, file) {
		let { name, price, brandId, typeId, info } = body;
		const { img } = file;
		let fileName = uuid.v4() + ".jpg"
		await img.mv(path.resolve(__dirname, '..', 'static', fileName));

		const device = await Device.create({name, price, brandId, typeId, info, img: fileName});

		if(info) {
			info = JSON.parse(info);
			info.forEach(item => {
				DeviceInfo.create({
					title: item.title,
					description: item.description,
					deviceId: device.id
				})
			})
		}
		return device
	}

	async getAll(body) {
		console.log("BODY", body)
		let { brandId, typeId, limit, page } = body;
		page = page || 1
		limit = Number(limit || 9)
		let offset = page * limit - limit;

		let devices;
		if(!brandId && !typeId) {
			devices = await Device.findAndCountAll({where: {}, limit, offset})
		}
		if(brandId && !typeId) {
			devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
		}
		if(typeId && !brandId) {
			devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
		}

		if(brandId && typeId) {
			devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
		}
		return devices;
	}

	async getOne(id) {
		const device = await Device.findOne(
			{
				where: {id},
				include: [{model: DeviceInfo, as: 'info'}]
			},
		)
		return device;
	}
}

module.exports = new DeviceService;