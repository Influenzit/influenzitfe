import axios from "axios"

// fetches token from session storage 
const token = typeof window !== "undefined" && localStorage && localStorage.getItem("token");
// creates an instance of axios
export const axiosInstance = axios.create({
    baseURL: "https://influenzitbe.herokuapp.com/api/v1",
    headers: {
        Authorization: token ? `Bearer ${token}` : ""
    }
})
