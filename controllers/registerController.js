const User = require("../model/User");
const { genSalt, genPassword } = require("../utilty/hashPassword");
const createObject = require("../services/customeCreate");
const {registerSchema} = require("../services/userValidator");

const registerHandler = async (req, res) => {
  // get the user info
  const { username, email, pwd } = req.body;
  if (!username || !email || !pwd) {
    res
      .status(400)
      .json({ message: "username, email and password are required!" });
  }
  try {
    const val = await registerSchema.validateAsync({ username, email, password: pwd });
    // look for existing user with same email
    userExist = await User.findOne({ email: email }).exec();
    if (userExist) {
      res.status(409).json({ message: "Email Already Exists!" });
    }
    try {
      // encrypt password
      const salt = await genSalt();
      const hashedPassword = await genPassword(pwd, salt);
      // create and save the new user
      const newUser = await createObject(
        {
          username: username,
          email: email,
          password: hashedPassword,
          salt: salt,
        },
        User
      );
      return res.status(201).json({ success: `New user ${username} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { registerHandler };
