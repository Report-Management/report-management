import ruppLogo from "../../assets/rupp.jpg";
import { Outlet } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export const AuthView = () => {
    return (
        <div className="md:flex md:flex-row dark:bg-gray-900 h-screen">
            <div
                className="w-[60%] bg-cover relative md:block hidden"
                style={{
                    backgroundImage: `url(${ruppLogo})`,
                }}
            ></div>
            <div className="flex-auto">
                <Outlet />
            </div>
        </div>
    );
};