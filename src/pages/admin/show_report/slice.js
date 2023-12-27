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
        setLoadingIndex: (state, action) => {
            const {isLoading, index} = action.payload;
            if (state.listReports[index]) {
                state.listReports[index].isLoading = isLoading;
            }
        },
        setTextHiddenIndex: (state, action) => {
            const { isNotShowText, index } = action.payload;
            return {
                ...state,
                listReports: state.listReports.map((report, i) =>
                    i === index ? { ...report, isNotShowText } : report
                ),
            };
        },
        setSummaryIndex: (state, action) => {
            const { data, index } = action.payload;
            return {
                ...state,
                listReports: state.listReports.map((report, i) =>
                    i === index ? { ...report, information: data } : report
                ),
            };
        },
        removeReport: (state, action) => {
            const index = action.payload;
            if (index >= 0 && index < state.listReports.length) {
                state.listReports.splice(index, 1);
            }
        },
        removeReportID: (state, action) => {
            const reportIdToRemove = action.payload;

            // Find the index of the report with the matching ID
            const indexToRemove = state.listReports.findIndex(report => report.id === reportIdToRemove);

            // Check if the report with the specified ID exists
            if (indexToRemove !== -1) {
                // Remove the report with the specified ID
                state.listReports.splice(indexToRemove, 1);
            }
        },

    },
});

export const { setLoading, setListReport, setLoadingIndex, removeReport, setTextHiddenIndex, setSummaryIndex, removeReportID} = createAdminReportSlice.actions;
export default createAdminReportSlice.reducer;