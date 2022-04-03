const { Router } = require("express")
const router = new Router();
const UserController = require('../controllers/user.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post("/registration",
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getAllUsers);

module.exports = router;