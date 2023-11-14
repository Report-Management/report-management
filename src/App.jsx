import './App.css'
import {useEffect, useState} from "react";
import {Loading, PagesRoute} from "./xcore";
import {redirect, Route, Routes, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {supabaseSession} from "./core/index.js";
import {AuthRepository} from "./pages/auth/auth_repository.js";

function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 3300);
    }, []);
    const [session, setSession] = useState(null)

    const navigate = useNavigate()
    const authRepo = new AuthRepository();
    useEffect(() => {

        // const fetchUserRole = async () => {
        //     if(session) {
        //         const role = await authRepo.getUserRole(session.user.id);
        //         console.log(role);
        //         if(role === "Admin") navigate(PagesRoute.admin, { replace: true });
        //         else navigate(PagesRoute.user, { replace: true });
        //     }
        // }

        supabaseSession.auth.getSession().then( async ({ data: { session } }) => {
            setSession(session)
            if (session) {
                console.log(session.user.id);
                let role = await authRepo.getUserRole(session.user.id);
                console.log(await authRepo.getUserRole(session.user.id));
                if(role === "Admin") navigate(PagesRoute.admin, { replace: true });
                else navigate(PagesRoute.user, { replace: true });
            } else {
                navigate(PagesRoute.root, { replace: true });
            }
        })

        const {data: { subscription },} = supabaseSession.auth.onAuthStateChange( async (_event, session) => {
            setSession(session)
            if (session) {
                console.log(session.user.id);
                let role = await authRepo.getUserRole(session.user.id);
                console.log(role);
                if(role === "Admin") navigate(PagesRoute.admin, { replace: true });
                else navigate(PagesRoute.user, { replace: true });
            } else {
                navigate(PagesRoute.root, { replace: true });
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return <Loading/>;
    }
    return (
        <main>
            <ToastContainer
                autoClose={2000}
            />
            <Routes>
                {PagesRoute.routeConfig.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}>
                        {route.routes &&
                            route.routes.map((subRoute, subIndex) => (
                                <Route
                                    key={subIndex}
                                    path={subRoute.path}
                                    element={subRoute.element}
                                />
                            ))}
                    </Route>
                ))}
            </Routes>
        </main>
    );
}

export default App
