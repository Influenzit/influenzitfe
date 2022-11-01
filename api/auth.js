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
export const resetPassword = (data) => {
    return axiosInstance.post("/auth/password/reset", data);
}
export const resendEmail = (data) => {
    return axiosInstance.post("/auth/email/resend", data);
}
export const getUserAccount = (userId) => {
    return axiosInstance.get(`/users/${userId}`)
}
export const accountTypeUpdate = (data) => {
    return axiosInstance.patch(`/accounts/toggle-type`, data);
}
