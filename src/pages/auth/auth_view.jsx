
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css';
import {useEffect} from "react";
import {PagesRoute} from "../../routes.jsx";

export const AuthView = () => {
    return (
        <Outlet />
    );
};