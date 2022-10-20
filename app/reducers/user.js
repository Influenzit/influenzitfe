import { createSlice } from "@reduxjs/toolkit";

const user = (typeof window !== "undefined" && sessionStorage.getItem("user")) && JSON.parse(sessionStorage.getItem("user"));
const initialState = user ? user : null
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser(_, { payload }) {
            return payload;
        },
        clearUser() {
            return null
        },
    }
})
export const { updateUser, clearUser} = userSlice.actions;
export const getUser = (state) => state.user;
export default userSlice.reducer
