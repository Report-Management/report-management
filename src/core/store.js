import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../pages/auth/auth_slice";
import createUserSlice from "../pages/admin/create_user/slice";
import createReportSlice  from "../pages/user/create/slice";
import adminReport from "../pages/admin/show_report/slice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        create_user: createUserSlice,
        create_report: createReportSlice,
        admin_report: adminReport
    }
});
export default store;
