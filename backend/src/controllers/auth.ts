import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db/Users";
import { authentication, random } from "../helpers";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(404).json({ message: "User Already exists" });
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("REGISTER_ERROR: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
