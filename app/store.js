import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import statusReducer from "./reducers/status";
export const store = configureStore({
    reducer: {
        user: userReducer,
        status: statusReducer,
    },
})