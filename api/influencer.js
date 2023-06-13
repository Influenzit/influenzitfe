import { axiosInstance } from "./axios"
// Skills API Requests
export const createSkills = (data) => {
    return axiosInstance().post(`/accounts/skills`, data)
}
export const updateSkills = (data) => {
    return axiosInstance().post(`/accounts/skills`, data)
}
export const getSkills = () => {
    return axiosInstance().get(`/accounts/skills`)
}
export const deleteSkill = (index) => {
    return axiosInstance().delete(`/accounts/skills/${index}`)
}
// Experiences API Request
export const createExperiences = (data) => {
    return axiosInstance().post(`/accounts/experiences`, data)
}
export const updateExperiences = (data, experienceId) => {
    return axiosInstance().patch(`/accounts/experiences/${experienceId}`, data)
}
export const getExperiences = () => {
    return axiosInstance().get(`/accounts/experiences`)
}
export const deleteExperience = (index) => {
    return axiosInstance().delete(`/accounts/experiences/${index}`)
}
// Certifications API Request
export const createCertifications = (data) => {
    return axiosInstance().post(`/accounts/certifications`, data)
}
export const updateCertifications = (data, certificationId) => {
    return axiosInstance().patch(`/accounts/certifications/${certificationId}`, data)
}
export const getCertifications = () => {
    return axiosInstance().get(`/accounts/certifications`)
}
export const deleteCertification = (index) => {
    return axiosInstance().delete(`/accounts/certifications/${index}`)
}
// Services API Request
export const createServices = (data) => {
    return axiosInstance().post(`/services`, data)
}
export const updateServices = (data, serviceId) => {
    return axiosInstance().patch(`/services/${serviceId}`, data)
}
export const getServices = () => {
    return axiosInstance().get(`/services`)
}
export const getService = (serviceId) => {
    return axiosInstance().get(`/services/${serviceId}`)
}
export const getExploreService = (serviceId) => {
    return axiosInstance().get(`/explore/services/${serviceId}`)
}
export const uploadServiceMedia = (serviceId, data) => {
    return axiosInstance().post(`/services/${serviceId}/media`, data);
}
export const createServicePackage = (serviceId, data) => {
    return axiosInstance().post(`/services/${serviceId}/packages`, data)
}
export const updateServicePackage = (serviceId, data) => {
    return axiosInstance().patch(`/services/${serviceId}/packages`, data)
}
export const deleteService = (index) => {
    return axiosInstance().delete(`/services/${index}`)
}
// Service Faq API Request
export const createFaqServices = (serviceId, data) => {
    return axiosInstance().post(`/services/${serviceId}/faqs`, data)
}
export const updateServiceFaq = (serviceId, data) => {
    return axiosInstance().patch(`/services/${serviceId}/faqs`, data)
}
// Service Review API Request
export const createReviewServices = (serviceId, data) => {
    return axiosInstance().post(`/services/${serviceId}/reviews`, data)
}
export const updateServiceReview = (serviceId, data) => {
    return axiosInstance().patch(`/services/${serviceId}/reviews`, data)
}

// Portfolios API Request
export const createPortfolios = (data) => {
    return axiosInstance().post(`/accounts/portfolios`, data)
}
export const updatePortfolios = (data) => {
    return axiosInstance().patch(`/accounts/portfolios`, data)
}
export const getPortfolios = () => {
    return axiosInstance().get(`/accounts/portfolios`)
}
export const deletePortfolio = (index) => {
    return axiosInstance().delete(`/accounts/portfolios/${index}`)
}
export const getInfluencers = (query) => {
    return axiosInstance().get(`/explore/influencers${query}&paginate=10`);
}
export const getCreators = (query) => {
    return axiosInstance().get(`/explore/creators${query}`);
}
export const getCreator = (id) => {
    return axiosInstance().get(`/explore/creators/${id}`)
}
export const exploreServices = (query) => {
    return axiosInstance().get(`/explore/services${query}`);
}
export const exploreAll = (query) => {
    return axiosInstance().get(`/explore${query}`);
}
export const getInfluencer = (id) => {
    return axiosInstance().get(`/explore/influencers/${id}`)
}
export const getExploreNiches = () => {
    return axiosInstance().get(`/explore/niches`)
}
export const getAnalytics = () => {
    return axiosInstance().get(`/analytics`)
}
export const getIndustries = () => {
    return axiosInstance().get(`/explore/industries`)
}
