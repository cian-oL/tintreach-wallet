import express, { Request, Response } from "express";

import {
  registerUser,
  fetchUserById,
  fetchAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

// /api/user
router.post("/register", registerUser);
router.get("/:id", fetchUserById);
router.get("/users", fetchAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
