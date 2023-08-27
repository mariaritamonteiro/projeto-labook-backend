import { UserDB } from "../models/Users";
import { BaseDataBase } from "./BaseDataBase";


export class UserDatabase extends BaseDataBase {
  public static TABLE_USERS = "users"

  public insertUser = async (
    userDB: UserDB
  ): Promise<void> => {
    await BaseDataBase
      .connection(UserDatabase.TABLE_USERS)
      .insert(userDB)
  }

  public findUserByEmail = async (
    email: string
  ): Promise<UserDB | undefined> => {
    // const [userDB]: Array<UserDB | undefined> = ...
    const [userDB] = await BaseDataBase
      .connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ email })

    return userDB as UserDB | undefined
  }
}