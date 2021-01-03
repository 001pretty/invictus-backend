const express = require("express");
const { body, check } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

const User = require("../models/user");

router.put(
  "/signup",
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already.'
            );
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.login
);

module.exports = router;
