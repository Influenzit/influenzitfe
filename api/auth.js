import { axiosInstance } from "./axios"

// this functions helps to create an account
export const createAccount = (data) => {
    return axiosInstance.post("/auth/register",  data);
}
export const loginUser = (data) => {
    return axiosInstance.post("/auth/login", data);
}
export const createBusiness = (data) => {
    return axiosInstance.post("/businesses", data);
}
export const forgotPassword = (data) => {
    return axiosInstance.post("/auth/password/forgot-password", data);
}
