import axios from "axios";

// creates an instance of axios
export const axiosInstance = () => {
    // fetches token from local storage 
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    return axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URI}/api/v1`,
        headers: {
            Authorization: !!token ? `Bearer ${token}` : ""
        }
    })
  };
