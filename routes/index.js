const { Router } = require("express")
const router = new Router();
const postRouter = require("./post.router");
const brandRouter = require("./brand.router");
const typeRouter = require("./type.router");
const deviceRouter = require("./device.router");
const authRouter = require("./auth.router");
const basketRouter = require("./basket.router");

router.use('/post', postRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/auth', authRouter);
router.use('/basket', basketRouter);

module.exports = router