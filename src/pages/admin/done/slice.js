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
        setLoadingSummaried: (state, action) => {
            const {isSummaried, index} = action.payload;
            if (state.listReports[index]) {
                state.listReports[index].isSummaried = isSummaried;
            }
        },
        setSummaryIndex: (state, action) => {
            const { data, index } = action.payload;
            return {
                ...state,
                listReports: state.listReports.map((report, i) =>
                    i === index ? { ...report, summaryText: data } : report
                ),
            };
        },
        removeReport: (state, action) => {
            const index = action.payload;
            if (index >= 0 && index < state.listReports.length) {
                state.listReports.splice(index, 1);
            }
        },
    },
});

export const { setLoading, setListReport, setLoadingIndex, removeReport, setLoadingSummaried, setSummaryIndex} = createAdminDoneReportSlice.actions;
export default createAdminDoneReportSlice.reducer;