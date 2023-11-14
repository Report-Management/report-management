import {useEffect, useState} from "react";
import {supabaseSession} from "../../core/index.js";
import {Outlet} from "react-router-dom";
import {UserSideBar} from "../../components/user/sidebar.jsx";

export const UserView = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        async function getUser() {
            await supabaseSession.auth.getSession().then(({data: {session}}) => {
                console.log(session)
                setUser(session)
            })
            await supabaseSession.auth.getUser().then(({data: {user}}) => {
                console.log(user)
            })
        }

        getUser()
    }, []);
    return (
        <div className="container mx-auto max-w-7xl">
            <div className="flex h-screen">
                <div>
                    <UserSideBar/>
                </div>

                <div className="w-full">
                    <div className="flex flex-col items-center justify-center relative min-w-7xl">
                        <div className="overflow-scroll">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}