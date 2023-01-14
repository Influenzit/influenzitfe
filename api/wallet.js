import { axiosInstance } from "./axios";

export const getWallet = (url) => {
    return axiosInstance().get(url ? url : "/wallets");
}
export const getWalletTransactions = () => {
    return axiosInstance().get("/wallets/transactions");
}
