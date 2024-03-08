const express = require("express");
const sendEmail = require("../utils/sendEmail");
const {
  register,
  login,
  verification,
} = require("../controllers/authController");
const router = express.Router();
//api/auth/register
router.post("/register", register);
//api/auth/login
router.post("/login", login);
//api/auth/verificaion
router.post("/verification", verification);
router.post("/otp", sendEmail);
module.exports = router;
