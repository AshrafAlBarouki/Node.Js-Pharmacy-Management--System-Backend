const User = require("../model/User");
const jwt = require("jsonwebtoken");

const refreshTokenHandler = async (req, res) => {
  // get the cookie info
  const cookies = req.cookies;
  const { email, pwd } = req.body;
  if (!cookies?.jwt) {
    res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  // look if existing user has refreshToken
  userExist = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!userExist) {
    res.status(403);
  }
  // check jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || userExist.username !== decoded.UserInfo.username) {
      res.sendStatus(403);
    }
    const roles = Object.values(decoded.UserInfo.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.UserInfo.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );
    res.json({ accessToken });
  });
};
module.exports = {refreshTokenHandler};
