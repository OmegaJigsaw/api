import express from "express";

import { login, verify } from "../controllers/auth-controller.js";

const router = express.Router();

router.get("/verify", verify);

export default router;
