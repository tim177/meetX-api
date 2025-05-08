const express = require("express");
const authController = require("../controllers/userController");
const { validateLogin, validateRegister } = require("../utils/validate");

const router = express.Router();

router.post("/login", validateLogin, authController.login);
router.post("/register", validateRegister, authController.register);
router.get("/logout", authController.logout);

module.exports = router;
