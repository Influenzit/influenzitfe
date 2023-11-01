import { axiosInstance } from './axios';

export const fetchCountryOptions = () => {
    return axiosInstance().get("/get/countries");
}
export const fetchStateOptions = (countryId) => {
    return axiosInstance().get(`/get/states/${countryId}`);
}
export const fetchCityOptions = () => {
    return axiosInstance().get("/get/cities");
}
