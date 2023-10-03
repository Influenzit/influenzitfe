import { axiosInstance } from "./axios"

export const fetchDashboardStats = () => {
    return axiosInstance().get("/admin/dashboard");
}
export const getAllCampaigns = (url) => {
    return axiosInstance().get(url ? url : "/admin/campaigns");
}
export const getAdminCampaign = (id) => {
    return axiosInstance().get(`/admin/campaigns/${id}`);
}
export const createAdminCampaignMilestone = (id, data) => {
    return axiosInstance().post(`/admin/campaigns/${id}/milestones`, data)
}
export const updateAdminCampaignMilestone = (id, data, milestoneId) => {
    return axiosInstance().patch(`/admin/campaigns/${id}/milestones/${milestoneId}`, data)
}
export const updateAdminCampaign = (id, data) => {
    return axiosInstance().patch(`/admin/campaigns/${id}`, data);
}
export const getAllUsers = (query) => {
    return axiosInstance().get(`/admin/accounts${query}`);
}
export const getSingleUser = (userId) => {
    return axiosInstance().get(`/admin/accounts/${userId}`);
}
export const getAllWallets = (query) => {
    return axiosInstance().get(`/admin/wallets${query}`);
}
export const getWalletSummary = (id) => {
    return axiosInstance().get(`/admin/accounts/${id}/wallet-summary`);
}
export const getWalletTransactions = (id, query) => {
    return axiosInstance().get(query ? query : `/admin/accounts/${id}/wallet-transactions?paginate=20`);
}
export const getWalletRequests = (id, query) => {
    return axiosInstance().get(query ? query : `/admin/accounts/${id}/wallet-withdrawals?status=pending&paginate=20`);
}
export const getAllBusinesses = (query) => {
    return axiosInstance().get(`/admin/businesses${query}`);
}
export const getWithdrawalRequests = (query, status) => {
    return axiosInstance().get(query ? query : `/admin/wallets/withdrawal-requests?paginate=20&status=${status}`)
}
export const updateWithdrawalReq = (id, data) => {
    return axiosInstance().post(`/admin/wallets/withdrawal-requests/${id}`, data);
}
export const verifyUserAccount = (userId) => {
    return axiosInstance().patch(`/admin/accounts/${userId}/verify-account`)
}
export const updateAccountAdmin = (userId, data) => {
    return axiosInstance().patch(`/admin/accounts/${userId}`, data)
}
export const getAllNiches = () => {
    return axiosInstance().get("/admin/niches");
}
export const createNiche = (data) => {
    return axiosInstance().post("/admin/niches", data);
}
export const getTicketCategories = () => {
    return axiosInstance().get("/admin/supports/ticket-categories");
}
export const createTicketCategory = (data) => {
    return axiosInstance().post("/admin/supports/ticket-categories", data);
}
export const deleteTicketCategory = (id) => {
    return axiosInstance().delete(`/admin/supports/ticket-categories/${id}`);
}
export const sendMail = (data) => {
    return axiosInstance().post("/admin/mails", data);
}
export const deleteNiche = (id) => {
    return axiosInstance().delete(`/admin/niches/${id}`);
}
export const getAllProjects = () => {
    return axiosInstance().get("/admin/projects");
}
export const getWaitlist = () => {
    return axiosInstance().get("/admin/waitlist");
}
export const getAccountActivities = (query) => {
    return axiosInstance().get(query ? query : "/admin/logs/activities?paginate=20")
}
export const getAdminSupportConversations = () => {
    return axiosInstance().get("/admin/supports");
}
export const getAdminMessages = (id) => {
    return axiosInstance().get("/admin/supports/" + id + "/messages");
}
export const postAdminMessages = (id, body) => {
    return axiosInstance().post("/admin/supports/" + id + "/messages", body);
}
export const updateAdminSupport = (id, body) => {
    return axiosInstance().patch("/admin/supports/" + id, body);
}
export const getAdminTicketCategoriesUser = () => {
    return axiosInstance().get("/admin/support/options");
}
export const getAdminCampaignRequests = (url) => {
return axiosInstance().get(url ? url.includes("/") ? url : `/admin/campaign/requests/pendings${url}` : `/admin/campaign/requests/pendings`);
}
export const deleteAdminCampaignRequests = (id) => {
    return axiosInstance().delete(`/admin/campaign/requests/${id}/delete`);
}
export const updateAdminCampaignRequestStatus = (body) => {
    return axiosInstance().post("/admin/campaign/requests/update/status", body)
}
export const getAdminSingleCampaignRequest = (id) => {
    return axiosInstance().get(`/admin/campaign/requests/show/${id}`);
}

// Businesses
export const getSingleBusinessAdmin = (id) => {
    return axiosInstance().get(`/admin/businesses/${id}`)
}
export const verifyBusinessAdmin = (data) => {
    return axiosInstance().post("/admin/businesses/verify", data);
}
export const deleteBusinessAdmin = (id) => {
    return axiosInstance().delete(`/admin/businesses/${id}`)
}
export const updateAdminBusinessStatus = (body) => {
    return axiosInstance().post("/admin/businesses/verify", body);
}
