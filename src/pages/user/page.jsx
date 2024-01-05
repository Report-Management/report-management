import { useEffect, useState } from "react";
import { supabaseSession } from "../../core/index.js";
import { Outlet, useNavigate } from "react-router-dom";
import { Loading, UserSideBar } from "../../components/index.jsx";
import { ButtonNavigationBar, NavigationBar } from "../../components/index.jsx";
import { PagesRoute } from "../../routes.jsx";
import { UserRepository } from "./repository.js";
import {AuthRepository} from "../auth/auth_repository.js";

export const UserView = () => {
    const [username, setUsername] = useState();
    const [profile, setProfile] = useState();
    const [email, setEmail] = useState();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const authRepo = new AuthRepository();

    async function getInfo() {
        const userRepository = new UserRepository();
        const result = await userRepository.getInfo();
        if (result !== null) {
            setEmail(result.email);
            setUsername(result.username);
            setProfile(result.profilePhoto);
        }
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        supabaseSession.auth.getSession().then(async ({data: {session}}) => {
            if (!session) {
                navigate(PagesRoute.root, { replace: true });
                return null
            } else {
                let role = await authRepo.getUserRole(session.user.id);
                if (role.role === "Admin") {
                    navigate(PagesRoute.admin, { replace: true });
                    return null
                }

            }
        })
        getInfo();
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen overflow-y-hidden">
                <Loading/>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-7xl">
            <div className="flex h-screen">
                <div className="hidden md:block">
                    <UserSideBar />
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full sticky top-0 z-20">
                        <NavigationBar
                            username={username}
                            profile={profile}
                            email={email}
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar w-full">
                        <Outlet />
                    </div>
                    <div className="md:hidden self-end w-full">
                        <ButtonNavigationBar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserView;
