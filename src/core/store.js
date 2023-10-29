import { configureStore } from "@reduxjs/toolkit";
import authProducer from "../pages/auth/auth_slice.js";

const store = configureStore({
    reducer: {
        auth: authProducer,
    }
});

export default store;
