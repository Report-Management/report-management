import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {AdminSideBar} from "../../components/index.jsx";
import {AdminNavigationBar} from "../../components/index.jsx";
import {AdminFilter} from "../../components/index.jsx";
import {AuthRepository} from "../auth/auth_repository.js";
import {useEffect, useState} from "react";
import {supabaseSession} from "../../core/index.js";
import {PagesRoute} from "../../routes.jsx";

export const AdminView = () => {
    const location = useLocation();
    const isAdminPath = location.pathname === '/admin';
    const [user, setUser] = useState(null)
    useEffect(() => {
        async function getAdmin() {
            await supabaseSession.auth.getSession().then(({data: {session}}) => {
                console.log(session)
                setUser(session)
            })
            await supabaseSession.auth.getUser().then(({data: {user}}) => {
                console.log(user)
            })
        }

        getAdmin()
    }, []);
    return (
        <div>
            <div className="flex h-screen">
                <div className="hidden md:block">
                    <AdminSideBar/>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full sticky top-0 z-20 px-6 md:px-0">
                        <AdminNavigationBar />
                    </div>
                    {isAdminPath && (
                        <div className="w-full">
                            <AdminFilter />
                        </div>
                    )}
                    <div className="flex-1 overflow-y-auto no-scrollbar w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}