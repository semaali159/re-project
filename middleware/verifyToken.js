const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}
//verify token and authorize the user
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "you are not allowed,you only can update your info" });
    }
  });
  //verify token and admin
}
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "you are not allowed,only admin can do that" });
    }
  });
}
//verify token and user himself
function verifyTokenAndOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "not allowed, only user himself" });
    }
  });
}
module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyTokenAndOnlyUser,
};
