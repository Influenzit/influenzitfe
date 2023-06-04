import { axiosInstance } from "./axios";

export const getCampaigns = (url) => {
  return axiosInstance().get(url ? url : "/campaigns");
};
export const getCampaign = (id) => {
  return axiosInstance().get(`/campaigns/${id}`);
};
export const getCampaignInvoice = (id) => {
  return axiosInstance().get(`/campaigns/${id}/invoices`);
};
export const createCampaignMilestone = (id, data) => {
  return axiosInstance().post(`/campaigns/${id}/milestones`, data);
};
export const getCampaignMilestones = (id) => {
  return axiosInstance().get(`/campaigns/${id}/milestones`);
};
export const updateCampaignMilestone = (id, data, milestoneId) => {
  return axiosInstance().patch(
    `/campaigns/${id}/milestones/${milestoneId}`,
    data
  );
};
export const acceptCampaignMilestone = (id, milestoneId) => {
  return axiosInstance().post(
    `/campaigns/${id}/milestones/${milestoneId}/accept`
  );
};
export const rejectCampaignMilestone = (id, milestoneId, data) => {
  return axiosInstance().post(
    `/campaigns/${id}/milestones/${milestoneId}/reject`,
    data,
  );
};
export const updateCampaign = (id, data) => {
  return axiosInstance().patch(`/campaigns/${id}`, data);
};
export const updateCampaignReview = (id, data) => {
  return axiosInstance().post(`/campaigns/${id}/reviews`, data);
};
export const handleCreateCampaign = (data) => {
  return axiosInstance().post(`/campaigns`, data);
};
