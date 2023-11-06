import './App.css'
import {useEffect, useState} from "react";
import {Loading, PagesRoute} from "./xcore";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {supabaseSession} from "./core/index.js";

function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 3300);
    }, []);
    const [session, setSession] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        supabaseSession.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session) {
                navigate('/reports'); // Change '/dashboard' to the desired route
            } else {

                navigate('/');
            }
        })

        const {
            data: { subscription },
        } = supabaseSession.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session) {
                navigate('/reports');
            } else {

                navigate('/');
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
