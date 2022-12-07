import { axiosInstance } from "./axios";

export const getCampaigns = (url) => {
    return axiosInstance().get(url ? url : "/campaigns")
}
export const getCampaign = (id) => {
    return axiosInstance().get(`/campaigns/${id}`)
}
