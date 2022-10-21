import { axiosInstance } from "./axios"

export const createBusiness = (data) => {
    return axiosInstance.post("/businesses", data);
}
export const getBusiness = (userId) => {
    return axiosInstance.get(`/businesses/${userId}`);
}