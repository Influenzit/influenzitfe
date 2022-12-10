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
export const updateCampaign = (id, data) => {
    return axiosInstance().patch(`/campaigns/${id}`, data,)
}
