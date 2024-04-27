const jwt = require("jsonwebtoken");

const KEY = "key";

function verifyToken(req, res, next) {
  // if (req.method === "OPTIONS") {
  //   return next();
  // }

  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Auth header is missing" });
  }
  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return res
      .status(401)
      .json({ message: "Unauthorized: Auth header is invalid" });
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = jwt.verify(authToken, KEY);
    req.token = validatedToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
  next();
}

module.exports = { verifyToken };
