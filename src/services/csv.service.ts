import { User, UserData, UserSchema } from "../models/user.model";
import { createUser } from "./user.service";

export async function createUsers(data:UserData[]): Promise<User[]> {
  
  try {
    const newParsedData = data.map(user => UserSchema.parse(user))
    let createdUsers:User[] = []
    for(let newUser of newParsedData) {
      let createdUser = await createUser(newUser)
      createdUsers.push(createdUser)
    }

    return createdUsers;
  } catch (error) {
    throw error;
  }
}