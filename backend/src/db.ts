import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
  port: Number(process.env.DB_PORT),
});

export default pool;
