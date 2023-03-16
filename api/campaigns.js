import { axiosInstance } from "./axios";

export const getCampaigns = (url) => {
    return axiosInstance().get(url ? url : "/campaigns")
}
export const getCampaign = (id) => {
    return axiosInstance().get(`/campaigns/${id}`)
}
export const createCampaignMilestone = (id, data) => {
    return axiosInstance().post(`/campaigns/${id}/milestones`, data)
}
export const updateCampaignMilestone = (id, data, milestoneId) => {
    return axiosInstance().patch(`/campaigns/${id}/milestones/${milestoneId}`, data)
}
export const updateCampaign = (id, data) => {
    return axiosInstance().patch(`/campaigns/${id}`, data,)
}
export const handleCreateCampaign = (data) => {
    return axiosInstance().post(`/campaigns/`, data,)
}