import { createSlice } from "@reduxjs/toolkit";

const initialState = null
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
