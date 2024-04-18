const express = require("express");
const {
  handleLogin,
  handleCreateUser,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", handleLogin);
router.post("/signup", handleCreateUser);

module.exports = { authRouter: router };
