import { NextFunction, Request, Response } from "express";
import { processUserList } from "../utils/processUsers";

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
    console.log(dataProcess)
    res.status(201).json({
      data: dataProcess,
    });
  } catch (error) {
    next(error);
  }
};

//