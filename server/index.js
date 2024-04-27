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
    origin: ["https://workout-app-blush.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/exercises", verifyToken, exerciseRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port} for request to respond to`);
});
