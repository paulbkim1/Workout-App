const express = require("express");
const cors = require("cors");
const { exerciseRouter } = require("./routes/exercise.routes");
const { authRouter } = require("./routes/auth.routes");
const { verifyToken } = require("./middleware/authMiddleware");

const port = 8000;

require("./config/mongoose.config");

const app = express();

app.use(
  cors({
    origin: ["https://workout-app-client-rho.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use(verifyToken);
app.use("/api/exercises", exerciseRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port} for request to respond to`);
});
