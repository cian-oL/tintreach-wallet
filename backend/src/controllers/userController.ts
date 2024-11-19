import express, { Request, Response } from "express";
import pool from "../db";
import { User } from "../models/User";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const existingUser: User = (
      await pool.query("SELECT * FROM users WHERE username=$1", [username])
    ).rows[0];

    if (existingUser) {
      return res.status(409).json({ message: "Error registering User" });
    }

    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);

    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.log("Error registering user", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const user: User = (
      await pool.query("SELECT * FROM users WHERE username = $1", [username])
    ).rows[0];

    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log("Error registering user", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { registerUser, getUserByUsername };
