const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const {
  validateLogin,
  validateRegister,
  Elderly,
  validateVerify,
} = require("../model/elderly");
/**
 * @desc register new user
 * @route /api/auth/register
 * @method post
 * @access puplic
 * */
const register = asynchandler(async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let elderly = await Elderly.findOne({ email: req.body.email });
  if (elderly) {
    return res.status(400).json({ message: "this user already registered" });
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  elderly = new Elderly({
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phnumber: req.body.phnumber,
    age: req.body.age,
    diseases: req.body.diseases,
    otpnum: parseInt(req.body.otpnum),
  });
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const otp = generateRandomNumber(1000, 9999);

  
  await sendEmail(req.body.email, otp);
  elderly.otpnum = otp;
  const result = await elderly.save();
  // const token = elderly.generateToken();
  const { password, ...other } = result._doc;
  return res.status(201).json({ ...other });
});

/**
 * @desc login user
 * @route /api/auth/login
 * @method post
 * @access puplic
 * */
const login = asynchandler(async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let elderly = await Elderly.findOne({ email: req.body.email });
  if (!elderly) {
    return res.status(400).json({ message: "invalid password or email" });
  }
  if (elderly.verified) {
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      elderly.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = elderly.generateToken();
    const { password, ...other } = elderly._doc;
    return res.status(201).json({ ...other, token });
  } else {
    return res.status(400).json({ message: "please verify your email first" });
  }
});

const verification = asynchandler(async (req, res) => {
  const { error } = validateVerify(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let elderly = await Elderly.findOne({ email: req.body.email });
  if (req.body.otpnum == elderly.otpnum) {
    elderly.verified = true;
    elderly.save();
    return res.status(201).json({ message: "verify is done " });
  } else {
    return res.status(400).json({ message: "invalid email or otpnum " });
  }
});
module.exports = {
  register,
  login,
  verification,
};
