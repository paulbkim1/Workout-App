const { authenticateUser, createUser } = require("../services/auth.service");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { firstName, lastName, token } = await authenticateUser(
      email,
      password
    );

    return res.json({
      firstName,
      lastName,
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleCreateUser = async (req, res) => {
  console.log("controller: handleCreateUser req.body: ", req.body);

  try {
    const { firstName, lastName, token } = await createUser(req.body);

    return res.json({
      firstName,
      lastName,
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json(error);
  }
};
module.exports = { handleLogin, handleCreateUser };
