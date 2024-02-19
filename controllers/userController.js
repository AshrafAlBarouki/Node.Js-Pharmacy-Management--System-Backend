const User = require("../model/User");
const fetchAll = require("../services/customeFetchAll");
const fetchOne = require("../services/customeFetchOne");
const { updateSchema } = require("../services/userValidator");
const customeDeleteOne = require("../services/customeDeleteOne");

// get all users

const getAllUsers = async (req, res) => {
  const users = await fetchAll(User);
  if (!users) {
    return res.status(204).json({ message: "No users were found" });
  }
  res.status(200).json(users);
};

//update a user

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const user = await fetchOne({ _id: req.body.id }, User);
  try {
    if (req.body?.username || req.body?.email) {
      const val = await updateSchema.validateAsync({ username, email });
      user.username = req.body.username;
      user.email = req.body.email;
    }
    const result = await user.save();
    if (!result) {
      return res.status(400).json({ message: "Somthing went wrong" });
    }
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const result = await customeDeleteOne({ _id: req.body.id }, User);
  if (result) {
    return res.status(400).json({ message: "No prescription was Found" });
  }
  res.status(200).json(result);
};

// get user By ID
const getUserById = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const user = await fetchOne({ _id: req.params.id }, User);
  res.status(200).json(user)
};


module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
};
