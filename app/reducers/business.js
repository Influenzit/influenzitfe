import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businesses: (typeof window !== "undefined" && JSON.parse(localStorage.getItem("businesses"))) ?? [],
    currentBusiness: (typeof window !== "undefined" && JSON.parse(localStorage.getItem("businesses"))) ?? "",
}
const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        setBusinesses(state, { payload }) {
            localStorage.setItem("businesses", JSON.stringify(payload));
            state.businesses = payload;
        },
        setCurrentBusiness(state, { payload }) {
            localStorage.setItem("currentBusiness", JSON.stringify(payload));
            state.currentBusiness = payload;
        },
        clearBusiness(state) {
            state.businesses = []
            state.currentBusiness = ""
        }
    }
})
export const getBusinessesFromState = (state) => state.business.businesses;
export const getCurrentBusiness = (state) => state.business.currentBusiness;
export const { setBusinesses, setCurrentBusiness, clearBusiness } = businessSlice.actions;
export default businessSlice.reducer
