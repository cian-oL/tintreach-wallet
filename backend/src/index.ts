import express from "express";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";

const PORT = (process.env.PORT as string) || "8080";

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
