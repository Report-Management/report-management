import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../pages/auth/auth_slice";
import createUserSlice from "../pages/admin/create_user/slice";
import createReportSlice  from "../pages/user/create/slice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        create_user: createUserSlice,
        create_report: createReportSlice
    }
});
export default store;
