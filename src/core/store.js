import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../pages/auth/auth_slice";
import createUserSlice from "../pages/admin/create_user/slice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        create_user: createUserSlice,
    }
});
export default store;
