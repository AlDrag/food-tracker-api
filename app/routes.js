const Router = require("koa-router");
const router = new Router();

const BASE_URL_V1 = `/api/v1`;
const foodController = require("./controllers/food.controller");

router.get(`${BASE_URL_V1}/food`, foodController.index);
router.get(`${BASE_URL_V1}/food/:id`, foodController.get);
router.post(`${BASE_URL_V1}/food`, foodController.post);

module.exports = router;