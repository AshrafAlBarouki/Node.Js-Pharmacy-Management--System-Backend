const User = require("../model/User");
const ROLES_LIST = require("../config/roles_list");


// give a user Editor privlages
const giveEditorPrivlages = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const user = await User.findOne({ _id: req.body.id });
  if (!user) {
    return res.status(404).json({ message: "User Not Found!" });
  }
  user.roles.Editor = 1999;
  await user.save();
  res.status(201).json({
    message: `The user: ${user.username} has now ${user.roles}  privlages`,
  });
};

// give a user Admin privlages
const giveAdminPrivlages = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const user = await User.findOne({ _id: req.body.id });
  if (!user) {
    return res.status(404).json({ message: "User Not Found!" });
  }
  user.roles.Admin = 5150;
  await user.save();
  res.status(201).json({
    message: `The user: ${user.username} has now ${user.roles}  privlages`,
  });
};

// revok a user Editor privlages
const revokEditorPrivlages = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const user = await User.findOne({ _id: req.body.id });
  if (!user) {
    return res.status(404).json({ message: "User Not Found!" });
  }
  user.roles = Object.keys(user.roles)
    .filter((objKey) => objKey !== "Editor")
    .reduce((newObj, key) => {
      newObj[key] = user.roles[key];
      return newObj;
    }, {});
  await user.save();
  res.status(201).json({
    message: `The user: ${user.username} lost Editor privlages`,
  });
};

// revok a user Admin privlages
const revokAdminPrivlages = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const user = await User.findOne({ _id: req.body.id });
  if (!user) {
    return res.status(404).json({ message: "User Not Found!" });
  }
  user.roles = Object.keys(user.roles)
    .filter((objKey) => objKey !== "Admin")
    .reduce((newObj, key) => {
      newObj[key] = user.roles[key];
      return newObj;
    }, {});
  await user.save();
  res.status(201).json({
    message: `The user: ${user.username} lost Admin privlages`,
  });
};

module.exports = {
  giveEditorPrivlages,
  giveAdminPrivlages,
  revokEditorPrivlages,
  revokAdminPrivlages,
};
