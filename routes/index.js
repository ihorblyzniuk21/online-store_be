const { Router } = require("express")
const router = new Router();
const postRouter = require("./post.router");
const brandRouter = require("./brand.router");
const typeRouter = require("./type.router");
const deviceRouter = require("./device.router");

router.use('/post', postRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);

module.exports = router