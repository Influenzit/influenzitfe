import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    loading: false,
    success: false,
    error: false,
    message: "",
    userType: "",
    currentConversation: 0,
    showSidebar: false,
    showLogoutModal: false,
}
const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload
        },
        setError(state, { payload }) {
            state.error = payload.error
            state.message = payload.message
        },
        setSuccess(state, { payload }) {
            state.success = payload.success;
            state.message = payload.message;
        },
        setLogoutModal(state, { payload }) {
            state.showLogoutModal = payload;
        },
        setUserType(state, { payload }) {
            state.userType = payload;
            localStorage.setItem("user-type", payload);
        },
        setCurrentConversation(state, { payload }) {
            state.currentConversation = payload;
            sessionStorage.setItem("cid", payload);
        },
        setShowSidebar(state, { payload }) {
            state.showSidebar = payload;
        },
    }
});
export const isLoading = (state) => state.status.loading;
export const isError = (state) => state.status.error;
export const getMessage = (state) => state.status.message;
export const getUserType = (state) => state.status.userType;
export const getShowSidebar = (state) => state.status.showSidebar;
export const isSuccess = (state) => state.status.success;
export const getLogoutModalStatus = (state) => state.status.showLogoutModal;
export const getCurrentConversationId = (state) => state.status.currentConversation;
export const { setLoading, setError, setSuccess, setUserType, setCurrentConversation, setShowSidebar, setLogoutModal } = statusSlice.actions
export default statusSlice.reducer
