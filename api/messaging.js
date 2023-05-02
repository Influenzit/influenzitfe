import { axiosInstance } from "./axios";

export const getConversations = () => {
  return axiosInstance().get("/messaging/conversations");
};
export const getConversationMessages = (id) => {
  return axiosInstance().get("/messaging/conversations/" + id + "/messages");
};
export const sendConversationMessage = (id, body) => {
  return axiosInstance().post(
    "/messaging/conversations/" + id + "/messages",
    body
  );
};
export const startConversation = (data) => {
  return axiosInstance().post("/messages", data);
};

// /campaigns/1100/conversation/messages/

//Service Messaging
export const getConversationServiceMessages = (service, id) => {
    return axiosInstance().get(`/${service}/${id}/conversation/messages`);
};
export const getServiceConversation = (service, id) => {
    if (service === "campaigns")

  return axiosInstance().get(`/${service}/${id}/conversation`);
  else return axiosInstance().get(`/${service}/${id}/conversations`);

};
export const sendServiceConversation = (service, id, data) => {
  return axiosInstance().post(`/${service}/${id}/conversation`, data);
};
