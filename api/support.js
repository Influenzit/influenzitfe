import { axiosInstance } from "./axios";

export const getSupportConversations = () => {
    return axiosInstance().get("/supports");
}
export const getMessages = (id) => {
    return axiosInstance().get("/supports/" + id + "/messages");
}
export const postMessages = (id, body) => {
    return axiosInstance().post("/supports/" + id + "/messages", body);
}
export const updateSupport = (id, body) => {
    return axiosInstance().patch("/supports/" + id, body);
}
export const createDispute = (data) => {
    return axiosInstance().post("/supports", data)
}
export const getTicketCategoriesUser = () => {
    return axiosInstance().get("/support/options");
}
