import express from "express";
import { updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};
