const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisateststring");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("Could not authenticate");
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send(e.message);
  }
};

module.exports = auth;
