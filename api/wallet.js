import { axiosInstance } from "./axios";

export const getWallet = (url) => {
    return axiosInstance().get(url ? url : "/wallets");
}
export const getWalletTransactions = () => {
    return axiosInstance().get("/wallets/transactions");
}
export const getWalletTransaction = (id) => {
    return axiosInstance().get("/transactions/" + id);
}
export const releaseFund = (data) => {
    return axiosInstance().post("/escrows/release", data);
}
