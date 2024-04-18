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
    console.error("Error loging in:", error);
    return res.status(400).json(error);
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
