import {useEffect, useState} from "react";
import {supabaseSession} from "../../core/index.js";
import {Outlet} from "react-router-dom";
import {UserSideBar} from "../../components/user/sidebar.jsx";
import {ButtonNavigationBar, NavigationBar} from "../../components/user/index.jsx";

export const UserView = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            await supabaseSession.auth.getSession().then(({data: {session}}) => {
                setUser(session)
            })
            await supabaseSession.auth.getUser().then(({data: {user}}) => {
                console.log(user)
            })
        }

        getUser()
    }, []);

    const profile = {
        username: 'Jane Cooper',
        email: 'lim.phanith.2821@rupp.edu.kh',
        img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }

    return (
        <div className="container mx-auto max-w-7xl">
            <div className="flex h-screen">
                <div className="hidden md:block">
                    <UserSideBar/>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full sticky top-0 z-20">
                        <NavigationBar {...profile} />
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