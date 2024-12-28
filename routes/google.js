const express = require("express");
const passport = require("passport");
const router = express.Router();

require("../config/passport-setup");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/profile");
  }
);
module.exports = router;
