const User = require("../model/User");
const jwt = require("jsonwebtoken");

const logoutHandler = async (req, res) => {
  // on the client side also delete the accessToken

  // get the cookie info
  const cookies = req.cookies;
  const { email, pwd } = req.body;
  if (!cookies?.jwt) {
    res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  // is refreshToken in DB?
  userExist = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!userExist) {
    res.clearCookie("jwt", { httpOnly: true });
    res.status(204);
  }
  userExist.refreshToken = " ";
  await userExist.save();
  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};
module.exports = {logoutHandler};
