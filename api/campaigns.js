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
export const getCampaignReview = (id) => {
  return axiosInstance().get(`/campaigns/${id}/reviews`);
};
export const handleCreateCampaign = (data) => {
  return axiosInstance().post(`/campaigns`, data);
};
export const createCampaignRequest = (data) => {
  return axiosInstance().post(`/campaigns/requests`, data);
};
export const updateCampaignRequest = (data, id) => {
  return axiosInstance().patch(`/campaigns/requests/${id}`, data);
}
export const getCampaignRequests = (url) => {
  return axiosInstance().get(url ? url.includes("/") ? url : `/campaigns/requests${url}` : `/campaigns/requests`);
}
export const getSingleCampaignRequest = (id) => {
  return axiosInstance().get(`/campaigns/requests/${id}`);
}
export const createProposal = (data, id) => {
  return axiosInstance().post(`/explore/campaign-requests/${id}/propose`, data)
}
export const getCampaignRequestSubmissions = (id, url) => {
  return axiosInstance().get(url ? url.includes("/") ? url : `/campaigns/requests/${id}/submissions${url}` : `/campaigns/requests/${id}/submissions`);
}
export const deleteCampaignRequest = (id) => {
  return axiosInstance().delete(`/campaigns/requests/${id}`);
}
export const getUserStatus = () => {
  return axiosInstance().get(`/get-user-email-status`);
}
