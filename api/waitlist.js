import { axiosInstance } from "./axios";

export const createWaitlist = (data) => {
    return axiosInstance().post("/waitlist", data);
}
