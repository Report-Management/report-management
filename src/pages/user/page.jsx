import {useEffect, useState} from "react";
import {supabaseSession} from "../../core/index.js";
import {Outlet, useNavigate} from "react-router-dom";
import {Loading, UserSideBar} from "../../components/index.jsx";
import {ButtonNavigationBar, NavigationBar} from "../../components/index.jsx";
import {PagesRoute} from "../../routes.jsx";
import {UserRepository} from "./repository.js";

export const UserView = () => {
    const navigate = useNavigate();
    useEffect(() => {
        supabaseSession.auth.getSession().then(async ({data: {session}}) => {
            if (!session) {
                navigate(PagesRoute.root, {replace: true});
            }
        })
    }, []);
    const [username, setUsername] = useState();
    const [profile, setProfile] = useState();
    const [email, setEmail] = useState();
    const [isLoading, setLoading] = useState(false)

    async function getInfo() {
        setLoading(true)
        const adminRepository = new UserRepository();
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
        <div className="container mx-auto max-w-7xl">
            <div className="flex h-screen">
                <div className="hidden md:block">
                    <UserSideBar/>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full sticky top-0 z-20">
                        <NavigationBar
                            username={username}
                            profile={profile}
                            email={email}
                        />
                    </div>
                    <div>

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
}