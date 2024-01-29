const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authSchema } = require("../services/userValidator");

const authHandler = async (req, res) => {
  // get the user info
  const { email, pwd } = req.body;
  try {
    const val = await authSchema.validateAsync({ email, password: pwd });
    // look for existing user with same email
    userExist = await User.findOne({ email: email }).exec();
    if (!userExist) {
      res.status(401); // Unauthorized
    }
    // check if password matches
    const match = await bcrypt.compare(pwd, userExist.password);
    if (match) {
      // get the user roles
      const roles = Object.values(userExist.roles);
      // create jwt
      const payload = {
        UserInfo: { username: userExist.username, roles: roles },
      };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m",
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      // save the refreshToken with current User
      userExist.refreshToken = refreshToken;
      const result = await userExist.save();
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      }); // add secure:true and sameSite:true
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { authHandler };
