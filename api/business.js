import { axiosInstance } from "./axios"

export const createBusiness = (data) => {
    return axiosInstance().post("/businesses", data);
}
export const getBusinesses = (token) => {
    if(token) {
        return axiosInstance().get(`/businesses`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        return axiosInstance().get(`/businesses`);
    }  
}
export const updateBusiness = (data, businessId) => {
    return axiosInstance().post(`/businesses/${businessId}`, data)
}
export const getBusiness = (businessId) => {
    return axiosInstance().get(`/businesses/${businessId}`);
}
export const getTopCampaigns = () => {
    return axiosInstance().get(`/campaigns/get/top/four/requests`);
}
