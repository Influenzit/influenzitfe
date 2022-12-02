import axios from "axios";

// creates an instance of axios
export const axiosInstance = () => {
    // fetches token from local storage 
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    return axios.create({
        baseURL: "https://phplaravel-870335-3074787.cloudwaysapps.com/api/v1",
        headers: {
            Authorization: !!token ? `Bearer ${token}` : ""
        }
    })
  };
