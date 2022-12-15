import { axiosInstance } from "./axios"

export const fetchDashboardStats = () => {
    return axiosInstance().get("/admin/dashboard")
}