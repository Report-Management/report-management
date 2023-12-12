import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    listReports: [],
};

export const createAdminReportSlice = createSlice({
    name: 'admin_report',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setListReport: (state, action) => {
            state.listReports = action.payload;
        },
    },
});

export const { setLoading, setListReport} = createAdminReportSlice.actions;
export default createAdminReportSlice.reducer;