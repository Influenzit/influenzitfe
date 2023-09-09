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
    return axiosInstance().get(`/accounts/social-profiles`);
}

export const disconnectSocialMedia = (id) => {
    return axiosInstance().delete(`/accounts/social-profiles/${id}`);
}
export const getReferrals = () => {
    return axiosInstance().get(`/referrals/get/for_user`);
}
export const logoutUser = () => {
    return axiosInstance().post("/auth/logout");
}
export const getAllReviews = (url, id) => {
    return axiosInstance().get(url ? url : `/accounts/${id}/reviews`);
}
export const verifyEmail = (query) => {
    return axiosInstance().get(`/auth/email/verify${query}`);
}
