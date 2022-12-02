import { axiosInstance } from "./axios";

export const createPaymentLog = (data) => {
    return axiosInstance().post("/payments/logs", data);
}
export const processPayment = (data) => {
    return axiosInstance().post("/payments/process", data);
}
