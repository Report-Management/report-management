import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    listReports: [],
};

export const createAdminDoneReportSlice = createSlice({
    name: 'done_report',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setListReport: (state, action) => {
            state.listReports = action.payload;
        },
        setLoadingIndex: (state, action) => {
            const {isLoading, index} = action.payload;
            if (state.listReports[index]) {
                state.listReports[index].isLoading = isLoading;
            }
        },
        removeReport: (state, action) => {
            const index = action.payload;
            if (index >= 0 && index < state.listReports.length) {
                state.listReports.splice(index, 1);
            }
        },
    },
});

export const { setLoading, setListReport, setLoadingIndex, removeReport} = createAdminDoneReportSlice.actions;
export default createAdminDoneReportSlice.reducer;