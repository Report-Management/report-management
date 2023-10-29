import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    email: '',
    password: '',
    error: '',
    loading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            if (action.payload === '') {
                state.error = ''
            }
            state.email = action.payload;
            state.error = '';
        },
        setPassword: (state, action) => {
            state.password = action.payload;
            state.error = '';
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setEmail, setPassword, setLoading} = authSlice.actions;
export default authSlice.reducer;