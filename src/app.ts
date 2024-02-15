import express, { Request, Response } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { authRouter } from "./routers/auth.router";
import errorHandler from "./middlewares/error.middleware";

// TODO route /login and /upload

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(errorHandler);
app.get("/", (_req: Request, res: Response) => {
  res.json({ test: "hola mundo" });
});
