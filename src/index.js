import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { PORT } from "./config/app-config.js";
import authRouter from "./routes/auth-routes.js";
import userRouter from "./routes/user-routes.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
};

app.use(allowCrossDomain);
app.use(express.json());

const APP_PORT = PORT || 3000;

app.use("/api/auth/", authRouter);
app.use("/api/users/", userRouter);

app.listen(APP_PORT, () => {
  console.log(`Server corriendo en ${PORT}`);
});
