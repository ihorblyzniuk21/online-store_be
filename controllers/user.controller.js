const UserService = require('../services/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../helpers/api-error');

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const user = await UserService.registration(req.body);
			res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			return res.json(user);
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const user = await UserService.login(req.body);
			res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			return res.json(user);
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await UserService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			next(e)
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await UserService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const user = await UserService.refresh(refreshToken);
			res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			return res.json(user);
		} catch (e) {
			next(e)
		}
	}

	async getAllUsers(req, res, next) {
		try {
			const users = await UserService.getAllUsers();
			return res.json(users);
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new UserController();