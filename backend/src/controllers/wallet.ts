import { Request, Response } from "express";
import {
  createWallet,
  deleteWalletById,
  getAllWalletsByUserId,
  getWalletById,
} from "../db/Wallets";

export const addWallet = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, icon } = req.body;
    console.log(icon);

    if (!name || !icon) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!id) {
      return res.status(403).json({ message: "Missing Id" });
    }

    const wallet = await createWallet({
      name,
      amount: 0,
      totalIncome: 0,
      totalExpenses: 0,
      icon,
      userId: id,
    });

    return res.status(200).json(wallet);
  } catch (error) {
    console.log("CREATE_WALLET_ERROR" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllWallets = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(403).json({ message: "Missing Id" });
    }

    const wallets = await getAllWalletsByUserId(id);

    return res.status(200).json(wallets);
  } catch (error) {
    console.log("GET_ALL_WALLETS_ERROR" + error);
    return res.status(500);
  }
};

export const updateWallet = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, icon, id } = req.body;

    if (!name || !icon || !id) {
      return res.status(400);
    }

    const wallet = await getWalletById(id);

    wallet.name = name;
    wallet.icon = icon;
    await wallet.save();

    return res.status(200).json(wallet);
  } catch (error) {
    console.log("UPDATE_WALLET_ERROR" + error);
    return res.status(500);
  }
};

export const deleteWallet = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.body;

    const deletedWallet = await deleteWalletById(id);

    return res.status(200).json(deletedWallet);
  } catch (error) {
    console.log("DELETE_WALLET_ERROR" + error);
    return res.status(500);
  }
};
