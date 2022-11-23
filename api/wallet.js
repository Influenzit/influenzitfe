import { axiosInstance } from "./axios";

export const getWallet = () => {
    return axiosInstance().get("/wallets");
}
export const getWalletTransactions = () => {
    return axiosInstance().get("/wallets/transactions");
}
