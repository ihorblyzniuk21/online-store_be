const { User } = require('../models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail.service');
const TokenService = require('./token.service');
const UserDto = require('../helpers/user-dto');
const ApiError = require('../helpers/api-error');

class UserService {
	async registration({name, email, password}) {
		const candidate = await User.findOne({where: {email}});
		if (candidate) {
			throw ApiError.BadRequest(`Email ${email} has already been taken!`)
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const user = await User.create({ name, email, password: hashPassword, activationLink });
		await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({...userDto});
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto }
	}

	async login({name, email, password}) {
		const user = await User.findOne({where: {email}});
		if(!user) {
			throw ApiError.BadRequest(`User not found`);
		}
		const isPassEquals = await bcrypt.compare(password, user.password);
		if(!isPassEquals) {
			throw ApiError.BadRequest(`Incorrect password`);
		}
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({...userDto});
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto }
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

		const user = await User.findOne({where: {id: userData.id}});
		console.log("DATA", user);
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({...userDto});
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto }
	}

	async getAllUsers() {
		const users = await User.findAll();
		return users;
	}
}

module.exports = new UserService();