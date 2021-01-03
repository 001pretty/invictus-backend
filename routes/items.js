const express = require("express");
const { body } = require("express-validator");

const itemController = require("../controllers/items");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/menitems", itemController.getMenItems);

router.get("/womenitems", itemController.getWomenItems);

router.get("/limiteditems", itemController.getLimitedItems);

router.get("/kidsitems", itemController.getKidsItems);

router.get("/saleitems", itemController.getSaleItems);

router.post("/searchitems", itemController.getSearchItems);

// _______________

router.get("/item/:itemId", itemController.getItem);

// _______________

router.post("/cart", isAuth, itemController.postCart);

router.post("/cartitems", isAuth, itemController.getCartItems);

router.post("/removecart", isAuth, itemController.removeCart);

// ______________

router.post(
  "/order",
  isAuth,
  [
    body("products.products").isArray(),
    body("products.totalPrice").not().isEmpty().isLength({ min: 2, max: 10 }),
    body("user.information.firstname").trim().isLength({ min: 2, max: 35 }),
    body("user.information.lastname").trim().isLength({ min: 2, max: 35 }),
    body("user.information.address").isLength({ min: 5, max: 25 }),
    body("user.information.postalcode").trim().isLength({ min: 5, max: 5 }),
    body("user.information.city").trim().isLength({ min: 2, max: 35 }),
  ],
  itemController.postOrder
);

router.post("/orderitems", isAuth, itemController.getOrder);

router.get("/fititems", itemController.getFitItems)

module.exports = router;
