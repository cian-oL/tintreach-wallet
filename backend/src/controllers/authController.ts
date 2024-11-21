import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { getUserByUsername } from "../models/User";
import { User } from "../types/userTypes";

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user: User = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token: string = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      return res
        .status(200)
        .json({ message: "Successfully signed in", token, user });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.log("Error signing in user", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
