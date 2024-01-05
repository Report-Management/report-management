import './index.css'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from "./App.jsx";
import {Provider} from "react-redux";
import store from "./core/store";
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
