import { axiosInstance } from "./axios";

export const getNotifications = () => {
    return axiosInstance().get("/notifications");
}
export const markAllAsRead = () => {
    return axiosInstance().get("/notifications/mark-all-read")
}
