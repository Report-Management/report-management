import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    header: "",
    description: "",
    category: "",
    priority: "",
    view: "",
    file: null,
};

const createReportSlice = createSlice(({
    name: 'createReport',
    initialState,
    reducers: {
        setFile(state, action) {
            state.file = action.payload;
        },
        setHeader(state, action) {
            state.header = action.payload;
        },
        setDescription(state, action) {
            state.description = action.payload;
        },
        setCategory(state, action) {
            state.category = action.payload;
        },
        setPriority(state, action) {
            state.priority = action.payload;
        },
        setView(state, action) {
            state.view = action.payload;
        },
    }

}))

export default createReportSlice.reducer;
export const {setFile, setHeader, setDescription, setCategory, setPriority, setView} = createReportSlice.actions;