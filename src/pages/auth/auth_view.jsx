import {Outlet} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css';
import React from "react";
import backgroundImage from '../../assets/rupp.jpg';

export const AuthView = () => {

    return (
        <div
            className="bg-no-repeat bg-cover bg-center relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="absolute bg-gradient-to-b from-blue-800 to-blue-900 opacity-50 inset-0 z-0"/>
            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                    <div className="self-start hidden lg:flex flex-col  text-white">
                        <h1 className="mb-3 font-bold text-5xl font-rubik"> Report Management System, RUPP </h1>
                        <p className="pr-3">
                            A school's Report Management System handles various issues, like electrical outages or air conditioning problems. It streamlines the reporting process, prioritizes tasks, and ensures efficient issue resolution. Contact the school's administrative offices for specific details.
                        </p>
                    </div>
                </div>
                <div className="self-center z-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};