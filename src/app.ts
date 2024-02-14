import express, { Request, Response } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

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
app.get("/", (_req: Request, res: Response) => {
  res.json({ test: "hola mundo" });
});
