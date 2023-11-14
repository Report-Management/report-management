import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    email: '',
    password: '',
    error: '',
    loading: false,
    userRole: 'User',
    username: '',
};

export const createUserSlice = createSlice({
    name: 'admin_create_user',
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
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
    },
});

export const { setEmail, setPassword, setLoading, setUserRole, setUsername} = createUserSlice.actions;
export default createUserSlice.reducer;