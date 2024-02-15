import * as userDB from "../data/user.data";
import { User, UserData, UserEdit } from "../models/user.model";
import ExpressReviewsError from "../utils/newError.utils";

export async function createUser(data: UserData): Promise<User> {
  const { name } = data;
  try {
    const user = await userDB.getUserByName(name);
    if (user) {
      throw new ExpressReviewsError("usuario ya existe", 403, "service error");
    }
    const userCreated = await userDB.createUser(data);
    return userCreated;
  } catch (error) {
    throw error;
  }
}

export async function getUserByName(username: string): Promise<User> {
  try {
    const user = await userDB.getUserByName(username);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 404, "service error");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const user = await userDB.getUserByEmail(email);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error");
    }
    return user;
  } catch (error) {
    throw error;
  }
}
export async function getUserByNameAndEmail(
  username: string,
  email: string
): Promise<User> {
  try {
    const user = await userDB.getUserByNameAndEmail(username, email);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(userId: number): Promise<User> {
  try {
    console.log(userId);
    const user = await userDB.getUserById(userId);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(
  userId: number,
  data: Partial<UserEdit>
): Promise<User> {
  try {
    const user = await userDB.getUserById(userId);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error");
    }
    const updatedUser = await userDB.updateUser(userId, data);
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId: number): Promise<User> {
  try {
    const user = await userDB.getUserById(userId);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error");
    }
    const deletedUser = await userDB.deleteUser(userId);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}
