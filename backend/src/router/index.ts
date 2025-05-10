import express from "express";
import auth from "./auth";
import user from "./user";
import wallet from "./wallet";

const router = express.Router();

export default (): express.Router => {
  auth(router);
  user(router);
  wallet(router);
  return router;
};
