import { axiosInstance } from "./axios";

export const getConversations = () => {
    return axiosInstance().get("/messaging/conversations");
}
export const getConversationMessages = (id) => {
    return axiosInstance().get("/messaging/conversations/" + id + "/messages");
}
export const sendConversationMessage = (id, body) => {
    return axiosInstance().post("/messaging/conversations/" + id + "/messages", body);
}
export const startConversation = (data) => {
    return axiosInstance().post("/messages", data)
}
