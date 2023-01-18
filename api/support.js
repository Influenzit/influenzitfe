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
export const createDispute = (data) => {
    return axiosInstance().post("/supports", data)
}
