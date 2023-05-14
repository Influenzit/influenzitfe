import { axiosInstance } from "./axios"

// this functions helps to create an account
export const createAccount = (data) => {
    return axiosInstance().post("/auth/register",  data);
}
export const loginUser = (data) => {
    return axiosInstance().post("/auth/login", data);
}

export const socialLogin = (data) => {
    return axiosInstance().post("/auth/social/login", data);
}
export const forgotPassword = (data) => {
    return axiosInstance().post("/auth/password/forgot-password", data);
}
export const resetPassword = (data) => {
    return axiosInstance().post("/auth/password/reset", data);
}
export const changePassword = (data) => {
    return axiosInstance().post("/auth/change-password", data);
}
export const resendEmail = (data) => {
    return axiosInstance().post("/auth/email/resend", data);
}
export const getUserAccount = () => {
    return axiosInstance().get(`/users/me`);
}
export const getAccount = () => {
    return axiosInstance().get("/accounts")
}
export const updateAccount = (userId, data) => {
    return axiosInstance().patch(`/accounts`, data)
}
export const accountTypeUpdate = (data) => {
    return axiosInstance().patch(`/accounts/toggle-type`, data);
}
export const accountMedia = (data) => {
    return axiosInstance().post(`/accounts/media`, data);
}
export const getUserSocialMedia = () => {
    return axiosInstance().get(`/accounts/social-profiles`)
}
