import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../pages/auth/auth_slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
    }
});

export default store;
