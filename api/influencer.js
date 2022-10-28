import { axiosInstance } from "./axios"
// Skills API Requests
export const createSkills = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/skills`, data)
}
export const updateSkills = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/skills`, data)
}
export const getSkills = (userId) => {
    return axiosInstance.get(`/accounts/${userId}/skills`)
}
export const deleteSkill = (userId, index) => {
    return axiosInstance.delete(`/accounts/${userId}/skills/${index}`)
}
// Experiences API Request
export const createExperiences = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/experiences`, data)
}
export const updateExperiences = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/experiences`, data)
}
export const getExperiences = (userId) => {
    return axiosInstance.get(`/accounts/${userId}/experiences`)
}
export const deleteExperience = (userId, index) => {
    return axiosInstance.delete(`/accounts/${userId}/experiences/${index}`)
}
// Certifications API Request
export const createCertifications = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/certifications`, data)
}
export const updateCertifications = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/certifications`, data)
}
export const getCertifications = (userId) => {
    return axiosInstance.get(`/accounts/${userId}/certifications`)
}
export const deleteCertification = (userId, index) => {
    return axiosInstance.delete(`/accounts/${userId}/certifications/${index}`)
}
// Services API Request
export const createServices = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/services`, data)
}
export const updateServices = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/services`, data)
}
export const getServices = (userId) => {
    return axiosInstance.get(`/accounts/${userId}/services`)
}
export const deleteService = (userId, index) => {
    return axiosInstance.delete(`/accounts/${userId}/services/${index}`)
}
// Portfolios API Request
export const createPortfolios = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/portfolios`, data)
}
export const updatePortfolios = (data, userId) => {
    return axiosInstance.post(`/accounts/${userId}/portfolios`, data)
}
export const getPortfolios = (userId) => {
    return axiosInstance.get(`/accounts/${userId}/portfolios`)
}
export const deletePortfolio = (userId, index) => {
    return axiosInstance.delete(`/accounts/${userId}/portfolios/${index}`)
}
