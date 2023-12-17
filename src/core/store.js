import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../pages/auth/auth_slice";
import createUserSlice from "../pages/admin/create_user/slice";
import createReportSlice  from "../pages/user/create/slice";
import adminReport from "../pages/admin/show_report/slice";
import doneReport from "../pages/admin/done/slice";
import approvedReport from "../pages/admin/approved/slice";
import spamReport from "../pages/admin/spam/slice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        create_user: createUserSlice,
        create_report: createReportSlice,
        admin_report: adminReport,
        done_report: doneReport,
        approved_report: approvedReport,
        spam_report: spamReport,
    }
});
export default store;
