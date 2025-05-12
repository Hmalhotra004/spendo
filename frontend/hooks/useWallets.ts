import { useQuery } from "@tanstack/react-query";
import { useWalletStore } from "../store/useWalletStore";
import { WalletType } from "../types";
import api from "../utils/api";

export const useWallets = (
  userId: string | undefined,
  token: string | null
) => {
  const setWallets = useWalletStore((s) => s.setWallets);
  const wallets = useWalletStore((s) => s.wallets);

  const query = useQuery<WalletType[]>({
    queryKey: ["wallets", userId],
    queryFn: async () => {
      const response = await api.get(`/wallets/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWallets(response.data);
      return response.data;
    },
    enabled: !!userId && !!token && !wallets,
  });

  return {
    wallets,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
