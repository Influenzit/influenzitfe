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

// /campaigns/1100/conversation/messages/

//Campaign Messaging
export const getConversationServiceMessages = (id) => {
    return axiosInstance().get(`/campaigns/${id}/conversation/messages`);
}
export const getServiceConversation = (id) => {
    return axiosInstance().get(`/campaigns/${id}/conversation`);
}
export const sendServiceConversation = (id) => {
    return axiosInstance().post(`/campaigns/${id}/conversation`);
}