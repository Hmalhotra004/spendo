import { create } from "zustand";
import { WalletType } from "../types";

type WalletStore = {
  wallets: WalletType[] | null;
  setWallets: (wallets: WalletType[]) => void;
  addWallet: (wallet: WalletType) => void;
  updateWallet: (
    id: string,
    updatedData: Partial<Pick<WalletType, "name" | "icon">>
  ) => void;
  deleteWallet: (id: string) => void;
};

export const useWalletStore = create<WalletStore>((set) => ({
  wallets: null,

  setWallets: (wallets) => set({ wallets }),

  addWallet: (wallet) =>
    set((state) => ({
      wallets: state.wallets ? [...state.wallets, wallet] : [wallet],
    })),

  updateWallet: (id, updatedData) =>
    set((state) => ({
      wallets:
        state.wallets?.map((wallet) =>
          wallet._id === id ? { ...wallet, ...updatedData } : wallet
        ) || null,
    })),

  deleteWallet: (id) =>
    set((state) => ({
      wallets: state.wallets?.filter((wallet) => wallet._id !== id) || null,
    })),
}));
