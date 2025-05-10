import { Request, Response } from "express";
import { deleteUserById, getUser, getUserById } from "../db/Users";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await getUser();

    return res.status(200).json(users);
  } catch (error) {
    console.log("GET_ALL_USERS_ERROR" + error);
    return res.status(500);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log("DELETE_USERS_ERROR" + error);
    return res.status(500);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400);
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();

    return res.status(200).json({ user: user });
  } catch (error) {
    console.log("UPDATE_USERS_ERROR" + error);
    return res.status(500);
  }
};
