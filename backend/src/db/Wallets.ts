import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    totalIncome: {
      type: Number,
      required: true,
    },
    totalExpenses: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const WalletModel = mongoose.model("wallet", WalletSchema);

export const getAllWalletsByUserId = (id: string) =>
  WalletModel.find({ userId: id });

export const getWalletById = (id: string) => WalletModel.findOne({ _id: id });

export const createWallet = (values: Record<string, any>) =>
  new WalletModel(values).save().then((wallet) => wallet.toObject());

export const deleteWalletById = (id: string) =>
  WalletModel.findOneAndDelete({ _id: id });

export const updateWalltById = (id: string, values: Record<string, any>) =>
  WalletModel.findByIdAndUpdate(id, values);
