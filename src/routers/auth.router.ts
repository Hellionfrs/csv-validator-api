import express from "express";
import { UserSchemaLogin, UserSchemaRegister } from "../models/user.model";
import { loginController, signUpController } from "../controller/auth.controller";
import { ValidateRequestMiddleware } from "../middlewares/validatedSchema.middleware";

export const authRouter = express.Router();

authRouter.post(
  "/signup",
  ValidateRequestMiddleware(UserSchemaRegister),
  signUpController
);
authRouter.post(
  "/login",
  ValidateRequestMiddleware(UserSchemaLogin),
  loginController
);
