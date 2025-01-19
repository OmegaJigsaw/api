import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user-controller.js";

const router = express.Router();

// GET /user/
router.get("/all/", getAllUsers);

router.get("/get/:id", getUserById);

// POST /user/
router.post("/create/", createUser);

// PUT /user/
router.put("/update/:id", updateUser);

// DELETE /user/
router.delete("/delete/:id", deleteUser);

export default router;
