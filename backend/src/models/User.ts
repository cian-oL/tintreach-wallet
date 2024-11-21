import { database } from "../db/dbConfig";
import { UserRequestDTO, User } from "../types/userTypes";

const dbTable = "users";

const createUser = (userData: UserRequestDTO) => {
  return database(dbTable).insert(userData).returning("*");
};

const getUserByUsername = (username: string) => {
  return database(dbTable).where({ username }).first();
};

const getUserById = (id: number) => {
  return database(dbTable).where({ id }).first();
};

const getAllUsers = () => {
  return database(dbTable);
};

const updateUserById = (id: number, user: User) => {
  return database(dbTable).where({ id }).update(user).returning("*");
};

const deleteUserById = (id: number) => {
  return database(dbTable).where({ id }).del();
};

export {
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
