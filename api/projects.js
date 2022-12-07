import { axiosInstance } from "./axios";

export const getProjects = (url) => {
    return axiosInstance().get(url ? url : "/projects")
}
export const getProject = (id) => {
    return axiosInstance().get(`/project/${id}`)
}
