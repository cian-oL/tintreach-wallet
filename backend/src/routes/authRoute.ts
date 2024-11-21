import express from "express";

import { signInUser } from "../controllers/authController";

const router = express.Router();

// /api/auth
router.post("/login", signInUser);

export default router;
