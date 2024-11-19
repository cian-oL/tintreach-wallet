import { Knex } from "knex";
import "dotenv/config";

const environments: string[] = ["development", "test", "production"];

const connection: Knex.ConnectionConfig = {
  host: process.env.DB_Host as string,
  database: process.env.DB_DATABASE as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
};

const commonConfig: Knex.Config = {
  client: "pg",
  connection,
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/db/migrations",
  },
  seeds: {
    directory: "./src/db/seeds",
  },
};

export default Object.fromEntries(
  environments.map((env) => [env, commonConfig])
);
