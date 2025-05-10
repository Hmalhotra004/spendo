import { Request, Response } from "express";
import { getUserById } from "../db/Users";

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

    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.log("UPDATE_USERS_ERROR" + error);
    return res.status(500);
  }
};
