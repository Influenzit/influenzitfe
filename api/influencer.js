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
    return axiosInstance().post(`/accounts/services`, data)
}
export const updateServices = (data) => {
    return axiosInstance().patch(`/accounts/services`, data)
}
export const getServices = () => {
    return axiosInstance().get(`/accounts/services`)
}
export const deleteService = (index) => {
    return axiosInstance().delete(`/accounts/services/${index}`)
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
