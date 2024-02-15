import express from "express";
import { updateFileController } from "../controller/csv.controller";

export const csvRouter = express.Router();

csvRouter.post("/upload", updateFileController);
