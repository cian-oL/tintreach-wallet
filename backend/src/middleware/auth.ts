import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = authorization.split(" ")[1];

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      next();
    });
  } catch (err) {
    console.log("Error verifying access token", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
