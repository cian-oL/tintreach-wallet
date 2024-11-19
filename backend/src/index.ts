import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import pool from "./db";
import userRoute from "./routes/userRoute";

pool
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("failed to connect to database", err));

const PORT = (process.env.PORT as string) || "8080";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/user", userRoute);

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
