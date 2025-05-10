import { NextFunction, Request, Response } from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/Users";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      res.status(403);
      return;
    }

    if (currentUserId.toString() !== id) {
      res.status(403);
      return;
    }

    next();
  } catch (error) {
    console.log("MIDDLEWARE_ERROR" + error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.header("Authorization")?.replace("Bearer ", "");
    if (!sessionToken) {
      res.status(401).json({ message: "Unauthorzied" });
      return;
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      res.status(404).json({ message: "User doesnt exist" });
      return;
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log("MIDDLEWARE_ERROR" + error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
