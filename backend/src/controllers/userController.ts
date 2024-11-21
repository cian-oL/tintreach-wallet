import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { User } from "../types/userTypes";
import {
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../models/User";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const existingUser: User = await getUserByUsername(username);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const encryptedPassword: string = await bcrypt.hash(password, 10);

    await createUser({ username, password: encryptedPassword });
    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.log("Error registering user", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const fetchUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: User = await getUserById(Number(id));

    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    return res.status(200).json({ id, username: user.username });
  } catch (err) {
    console.log("Error fetching user", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const fetchUserByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const user: User = await getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    return res.status(200).json({ id: user.id, username });
  } catch (err) {
    console.log("Error fetching user", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsers();

    return res.status(200).json({ users });
  } catch (err) {
    console.log("Error fetching all users", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: User = await getUserById(Number(id));

    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    await updateUserById(user.id, user);
    return res.status(200).json({ id, username: user.username });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const user: User = await getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    await deleteUserById(user.id);
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  registerUser,
  fetchUserById,
  fetchUserByUsername,
  fetchAllUsers,
  updateUser,
  deleteUser,
};
