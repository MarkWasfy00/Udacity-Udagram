import { db } from "../database/database";
import { hashThisPassword } from "../functions/passwordHash";
import { errorHandler, successWithData } from "../functions/responseHandler";
import bcrypt from "bcrypt";

// types
import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import { UserModel } from "./types/UserModel";
import securityConfig from "../config/env/security.config";

class User {
  // create user
  async create(user: UserModel): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const data = [user.email, user.firstname, user.lastname, hashThisPassword(user.password)];
      const query = "SELECT * from users WHERE email=$1";
      const response = await connection.query(query, [user.email]);
      if (response.rowCount) {
        connection.release();
        return errorHandler("email already registered");
      } else {
        const createUser = `INSERT INTO users (email, firstname, lastname, password) values ($1, $2, $3, $4) returning id, email, firstname, lastname`;
        const userResponse = await connection.query(createUser, data);
        connection.release();
        return successWithData("Success Created User", userResponse.rows[0]);
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // get all users
  async index(): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT id, email, firstname, lastname from users";
      const response = await connection.query(query);
      connection.release();
      return successWithData("Users Fetched", response.rows);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // get specific user
  async show(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = `SELECT id, email, firstname, lastname FROM users WHERE id=($1)`;
      const response = await connection.query(query, [id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("User Fetched", response.rows[0]);
      } else {
        return errorHandler("User not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // update specific user
  async update(id: number, user: UserModel): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const data = [user.email, user.firstname, user.lastname, hashThisPassword(user.password), id];
      const query = `UPDATE users SET email=$1, firstname=$2, lastname=$3, password=$4 WHERE id=$5 returning id, email, firstname, lastname`;
      const response = await connection.query(query, data);
      connection.release();
      return successWithData("User Updated", response.rows[0]);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // delete user
  async destroy(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT firstname FROM users WHERE id=$1";
      const response = await connection.query(query, [id]);
      if (response.rowCount) {
        const userInfo = await connection.query(
          "DELETE FROM users WHERE id=$1 returning id, email, firstname, lastname",
          [id]
        );
        connection.release();
        return successWithData("User Deleted", userInfo.rows[0]);
      } else {
        connection.release();
        return errorHandler("User not exist");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // auth user
  async auth(email: string, password: string): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const data = [email];
      const query = "SELECT password FROM users WHERE email=$1";
      const response = await connection.query(query, data);
      if (response.rows.length) {
        const userPassword = response.rows[0].password;
        const validPassword = bcrypt.compareSync(password + securityConfig.PEPPER, userPassword);
        if (validPassword) {
          const userInfo = await connection.query(
            "SELECT id, email, firstname, lastname from users WHERE email=$1",
            data
          );
          connection.release();
          return successWithData("User Authorized", userInfo.rows[0]);
        } else {
          connection.release();
          return errorHandler("Wrong password");
        }
      } else {
        connection.release();
        return errorHandler("Email not exist");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
}

export default User;
