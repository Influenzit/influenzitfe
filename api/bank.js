import { axiosInstance } from "./axios";

export const getBankDetails = () => {
    return axiosInstance().get("/accounts/banks");
}
export const lookupBankDetails = (data) => {
    return axiosInstance().post("/accounts/banks/verify-account", data)
}
export const addBankDetails = (data) => {
    return axiosInstance().post("/accounts/banks", data)
}
export const storeBvn = (data) => {
    return axiosInstance().post("/accounts/banks/bvn-lookup", data)
}
