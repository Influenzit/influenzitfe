import { axiosInstance } from "./axios"

// this functions helps to create an account
export const createAccount = (data) => {
    return axiosInstance.post("/auth/register",  data);
}
export const loginUser = (data) => {
    return axiosInstance.post("/auth/login", data);
}
export const forgotPassword = (data) => {
    return axiosInstance.post("/auth/password/forgot-password", data);
}
export const getUserAccount = (userId) => {
    return axiosInstance.get(`/accounts/${userId}`)
}
