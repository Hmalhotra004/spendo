import express from "express";
import {
  addWallet,
  deleteWallet,
  getAllWallets,
  updateWallet,
} from "../controllers/wallet";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/wallets/:id", isAuthenticated, getAllWallets);
  router.post("/wallet/:id", isAuthenticated, addWallet);
  router.patch("/wallet/:id", isAuthenticated, isOwner, updateWallet);
  router.delete("/wallet/:id", isAuthenticated, isOwner, deleteWallet);
};
