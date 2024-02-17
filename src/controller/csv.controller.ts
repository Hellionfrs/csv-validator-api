import { NextFunction, Request, Response } from "express";
import { processUserList } from "../utils/processUsers";
import { createUsers } from "../services/csv.service";

export const updateFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    // data.data array of user objects
    // {name: string, email: 'baz@bar.foo', age:'string'}
    console.log(data.data)
    const dataProcess = processUserList(data.data)
    const dataSuccess = dataProcess.data.success
    const usersCreated = await createUsers(dataSuccess) //name, email, age 
    console.log(usersCreated.length, "user created")
    console.log(dataProcess)
    res.status(201).json({
      data: dataProcess,
    });
  } catch (error) {
    next(error);
  }
};

//