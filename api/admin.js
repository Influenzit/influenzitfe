import { axiosInstance } from "./axios"

export const fetchDashboardStats = () => {
    return axiosInstance().get("/admin/dashboard");
}
export const getAllCampaigns = (url) => {
    return axiosInstance().get(url ? url : "/admin/campaigns");
}
export const getAdminCampaign = (id) => {
    return axiosInstance().get(`/admin/campaigns/${id}`);
}
export const createAdminCampaignMilestone = (id, data) => {
    return axiosInstance().post(`/admin/campaigns/${id}/milestones`, data)
}
export const updateAdminCampaignMilestone = (id, data, milestoneId) => {
    return axiosInstance().patch(`/admin/campaigns/${id}/milestones/${milestoneId}`, data)
}
export const updateAdminCampaign = (id, data) => {
    return axiosInstance().patch(`/admin/campaigns/${id}`, data);
}
export const getAllUsers = () => {
    return axiosInstance().get("/admin/users");
}
export const getAllNiches = () => {
    return axiosInstance().get("/admin/niches");
}
export const createNiche = (data) => {
    return axiosInstance().post("/admin/niches", data);
}
export const deleteNiche = (id) => {
    return axiosInstance().delete(`/admin/niches/${id}`);
}
export const getAllProjects = () => {
    return axiosInstance().get("/admin/projects");
}
