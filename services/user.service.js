const { User, Basket, BasketDevice, Device } = require('../models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail.service');
const TokenService = require('./token.service');
const UserDto = require('../helpers/user-dto');
const ApiError = require('../helpers/api-error');

class UserService {
	async registration({name, email, password, role}) {
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			throw ApiError.BadRequest(`Email ${email} has already been taken!`)
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const createdUser = await User.create({ name, role, email, password: hashPassword, activationLink });
		const basket = await Basket.create({ userId: createdUser.id });

		const user = await User.findOne({
			where: { email: createdUser.email },
			attributes: ['id', 'email', 'isActivated', 'name', 'role', 'createdAt', 'updatedAt'],
			include: [
				{
					model: Basket,
					as: 'basket',
					attributes: ['id'],
					include: [
						{
							model: BasketDevice,
							as: 'basket_devices',
							attributes: ['id', 'deviceId'],
							include: [
								{
									model: Device,
									as: 'device'
								}
							]
						}
					]
				}
			]
		});

		await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({...userDto});
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user }
	}

	async login({ email, password }) {
		const user = await User.findOne({
			where: { email },
			attributes: ['id', 'email', 'isActivated', 'name', 'role', 'password', 'createdAt', 'updatedAt'],
			include: [
				{
					model: Basket,
					as: 'basket',
					attributes: ['id'],
					include: [
						{
							model: BasketDevice,
							as: 'basket_devices',
							attributes: ['id', 'deviceId'],
							include: [
								{
									model: Device,
									as: 'device'
								}
							]
						}
					]
				}
			]
		});
		if(!user) {
			throw ApiError.BadRequest(`User not found`);
		}
		console.log(password, user.password)
		const isPassEquals = await bcrypt.compare(password, user.password);
		if(!isPassEquals) {
			throw ApiError.BadRequest(`Incorrect password`);
		}
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({...userDto});
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user }
	}

	async logout(refreshToken) {
		const token = await TokenService.removeToken(refreshToken);
		return token;
	}

	async activate(activationLink) {
		const user = await User.findOne({ where: { activationLink } });
		if(!user) {
			throw ApiError.BadRequest('invalid link');
		}
		user.isActivated = true;
		await user.save();
	}

	async refresh(refreshToken) {
		if(!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = TokenService.validateRefreshToken(refreshToken);
		const tokenFromDB = await TokenService.findToken(refreshToken);


		if(!userData || !tokenFromDB) {
			throw ApiError.UnauthorizedError();
		}

		const user = await User.findOne({
			where: {id: userData.id},
			attributes: ['id', 'email', 'isActivated', 'name', 'role', 'createdAt', 'updatedAt'],
			include: [
				{
					model: Basket,
					as: 'basket',
					attributes: ['id'],
					include: [
						{
							model: BasketDevice,
							as: 'basket_devices',
							attributes: ['id', 'deviceId'],
							include: [
								{
									model: Device,
									as: 'device'
								}
							]
						}
					]
				}
			]
		});
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({...userDto});
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user }
	}

	async getAllUsers() {
		const users = await User.findAll();
		return users;
	}
}

module.exports = new UserService();