import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserSchema, UserSchemaRegister } from "../models/user.model";
import bcrypt from "bcrypt";
import { costFactor, jwtSecret } from "../utils/const.utils";
import ExpressReviewsError from "../utils/newError.utils";
import "dotenv/config";
import { createUser, getUserByEmail } from "../services/user.service";
// import { currentDateFormated } from "../utils/currentDate";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataParsed = UserSchema.parse(UserSchemaRegister.parse(req.body));
    dataParsed.password = await bcrypt.hash(dataParsed.password, costFactor);
    const { role, password, ...newUser } = await createUser(dataParsed);

    res.status(201).json({
      ok: true,
      message: "Register exitoso",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const {username, password} = req.body;
    const { password, email } = req.body;
    const user = await getUserByEmail(email);
    const validPass = await bcrypt.compare(password, user.password);

    if (validPass) {
      const payload = {
        userId: user.id,
        name: user.name,
        userRole: user.role,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "10h" });
      res.json({
        ok: true,
        message: "Login exitoso",
        data: { token, role: user.role },
      });
    } else {
      throw new ExpressReviewsError(
        "password doesn't match with email",
        403,
        "Error at controllers"
      );
    }
  } catch (error) {
    next(error);
  }
};
