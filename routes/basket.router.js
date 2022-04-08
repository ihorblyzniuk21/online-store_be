const { Router } = require("express")
const router = new Router();
const BasketController = require('../controllers/basket.controller');

router.get("/", BasketController.getBasket);
router.post("/basket-device", BasketController.createBasketDevice);
router.get("/basket-device", BasketController.getBasketDevicesById);
router.delete("/basket-device", BasketController.deleteBasketDevice);

module.exports = router;