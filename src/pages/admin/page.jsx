import {Outlet, useLocation} from "react-router-dom";
import {AdminSideBar, Loading} from "../../components/index.jsx";
import {AdminNavigationBar} from "../../components/index.jsx";
import {AdminFilter} from "../../components/index.jsx";
import {AdminRepository} from "./repository.js";
import {useEffect, useState} from "react";

export const AdminView = () => {
    const location = useLocation();
    const isAdminPath = location.pathname === '/admin';
    const [username, setUsername] = useState();
    const [profile, setProfile] = useState();
    const [email, setEmail] = useState();
    const [isLoading, setLoading] = useState(false)

    async function getInfo() {
        setLoading(true)
        const adminRepository = new AdminRepository();
        const result = await adminRepository.getInfo();
        if (result !== null) {
            setEmail(result.email)
            setUsername(result.username)
            setProfile(result.profilePhoto)
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        getInfo()
    }, []);

    if (isLoading) {
        return <div className="h-screen">
            <Loading />
        </div>
    }

    return (
        <div>
            <div className="flex h-screen">
                <div className="hidden md:block">
                    <AdminSideBar/>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full sticky top-0 z-20 px-6 md:px-0">
                        <AdminNavigationBar
                            username={username}
                            profile={profile}
                            email={email}
                        />
                    </div>
                    {isAdminPath && (
                        <div className="w-full">
                            <AdminFilter/>
                        </div>
                    )}
                    <div className="flex-1 overflow-y-auto no-scrollbar w-full">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}