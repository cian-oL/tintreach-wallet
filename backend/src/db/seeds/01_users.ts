import { Knex } from "knex";
import bcrypt from "bcryptjs";

import { User } from "../../models/User";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  const userSeeds: User[] = [
    {
      id: 1,
      username: "Alice",
      password: bcrypt.hashSync("password", 10),
      admin_key: "1234",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      username: "Bob",
      password: bcrypt.hashSync("password", 10),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await knex("users").insert(userSeeds);
}
