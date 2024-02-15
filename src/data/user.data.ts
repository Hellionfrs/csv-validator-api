import { QueryResult } from "pg";
import { query } from "../db";
import { User, UserData, UserEdit } from "../models/user.model";
import { currentDateFormated } from "../utils/currentDate";
import ExpressReviewsError from "../utils/newError.utils";
import { objStringify } from "../utils/stringifyObject.utils";

export async function getUserByName(username: string): Promise<User> {
  try {
    return (await query("SELECT * FROM users WHERE name = $1;", [username]))
      .rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "usuario no existe",
      403,
      "data error",
      error
    );
  }
}

export async function getUserById(userId: number): Promise<User> {
  try {
    return (await query("SELECT * FROM users WHERE id = $1;", [userId]))
      .rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "usuario no existe",
      403,
      "data error",
      error
    );
  }
}

export async function getUserByEmail(email: string): Promise<User> {
  try {
    return (await query("SELECT * FROM users WHERE email = $1;", [email]))
      .rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Password no coincide con email",
      403,
      "data error",
      error
    );
  }
}
export async function getUserByNameAndEmail(
  name: string,
  email: string
): Promise<User> {
  try {
    return (
      await query("SELECT * FROM users WHERE name = $1 AND email = $2;", [
        name,
        email,
      ])
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Password no coincide con name",
      403,
      "data error",
      error
    );
  }
}

export async function createUser(data: UserData): Promise<User> {
  try {
    let queryCreateUser =
      "INSERT INTO users (name, password, email, role,createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    let queryWithAge =
      "INSERT INTO users (name, password, email, role, age, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

    let createdUser: QueryResult<User>;
    if (!data.age) {
      createdUser = await query(queryCreateUser, [
        data.name,
        data.password,
        data.email,
        data.role,
        data.createdat,
        data.updatedat,
      ]);
    }
    createdUser = await query(queryWithAge, [
      data.name,
      data.password,
      data.email,
      data.role,
      data.age,
      data.createdat,
      data.updatedat,
    ]);
    return createdUser.rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "No se pudo crear usuario",
      403,
      "data error",
      error
    );
  }
}

export async function updateUser(
  userId: number,
  data: Partial<UserEdit>
): Promise<User> {
  try {
    const dataStringify = objStringify(data);
    const updatedAt = currentDateFormated();
    return (
      await query(
        `UPDATE users SET ${dataStringify}, updatedat = $2  WHERE id = $1 RETURNING *;`,
        [userId, updatedAt]
      )
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "No se pudo editar usuario",
      403,
      "data error",
      error
    );
  }
}

export async function deleteUser(userId: number): Promise<User> {
  try {
    return (
      await query("DELETE FROM users WHERE id = $1 RETURNING *;", [userId])
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "No se pudo eliminar el usuario",
      403,
      "data error",
      error
    );
  }
}
