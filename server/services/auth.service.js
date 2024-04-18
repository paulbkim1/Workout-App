const { validationResult, check } = require("express-validator");
const { sign } = require("jsonwebtoken");
const { User } = require("../models/user.model");

const KEY = "key";

const validateLoginInput = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

const generateAuthToken = (userId) => {
  return sign({ userId }, KEY, { expiresIn: "1h" });
};

const authenticateUser = async (email, password) => {
  const errors = validationResult({ email, password, validateLoginInput });
  if (!errors.isEmpty()) {
    return { error: "Invalid input", errors: errors.array() };
  }

  const user = await User.findOne({ email, password });

  if (!user) {
    return { error: "Invalid credentials" };
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
