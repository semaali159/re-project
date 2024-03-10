const asynchandler = require("express-async-handler");
const { Elderly } = require("../model/elderly");
const getElderlyById = asynchandler(async (req, res) => {
  const elderly = await Elderly.findById(req.params.id).select(
    "-password -otpnum -token"
  );
  if (elderly) {
    res.status(200).json(elderly);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
module.exports = getElderlyById;
