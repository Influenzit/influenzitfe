import { axiosInstance } from "./axios";

export const getWallet = (url) => {
  return axiosInstance().get("/wallets/summary");
};
export const getWalletTransactions = () => {
  return axiosInstance().get("/wallets/transactions");
};
export const getWalletTransaction = (id) => {
  return axiosInstance().get("/transactions/" + id);
};
export const releaseFund = (data) => {
  return axiosInstance().post("/escrows/release", data);
};
export const createDepositTransaction = (data) => {
  return axiosInstance().post("/payments/logs", data);
};
export const processDepositTransaction = (data) => {
  return axiosInstance().post("/payments/process", data);
};
