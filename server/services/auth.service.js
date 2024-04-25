const { sign } = require("jsonwebtoken");
const { User } = require("../models/user.model");

const KEY = "key";

const generateAuthToken = (userId) => {
  return sign({ userId }, KEY, { expiresIn: "1h" });
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const firstName = user.firstName;
  const lastName = user.lastName;
  const token = generateAuthToken(user._id);

  return { firstName, lastName, token };
};

const createUser = async (data) => {
  console.log("Service: create user");

  const user = await User.create(data);

  const firstName = user.firstName;
  const lastName = user.lastName;
  const token = generateAuthToken(user._id);

  return { firstName, lastName, token };
};

module.exports = { authenticateUser, createUser };
