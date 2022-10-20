import axios from "axios"

// fetches token from session storage 
const token = typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("token");

// creates an instance of axios
export const axiosInstance = axios.create({
    baseURL: "https://influenzitbe.up.railway.app/api/v1",
    headers: {
        Authorization: token ? `Bearer ${token}` : ""
    }
})
