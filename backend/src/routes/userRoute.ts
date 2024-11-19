import express, { Request, Response } from "express";

import { getUserByUsername, registerUser } from "../controllers/userController";

const router = express.Router();

// /api/user
router.post("/register", registerUser);
router.get("/", getUserByUsername);

export default router;
