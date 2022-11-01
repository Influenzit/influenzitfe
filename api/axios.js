import axios from "axios";

// creates an instance of axios
export const axiosInstance = (() => {
    // fetches token from local storage 
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    return axios.create({
        baseURL: "https://influenzitbe.herokuapp.com/api/v1",
        headers: {
            Authorization: !!token ? `Bearer ${token}` : ""
        }
    })
  }
)();
