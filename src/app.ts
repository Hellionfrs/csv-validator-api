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

const corsOptions = {
  origin: process.env["CLIENT_ORIGIN"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authRouter)
app.use(errorHandler)
app.get("/", (_req: Request, res: Response) => {
  res.json({ test: "hola mundo" });
});
