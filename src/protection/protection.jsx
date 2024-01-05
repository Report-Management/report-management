import {Navigate, Outlet } from "react-router-dom";
import {useEffect, useState} from "react";
import {supabaseSession} from "../core/index.js";
import {PagesRoute} from "../routes.jsx";
import {Loading} from "../components/index.jsx";

const ProtectedRoute = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("ProtectedRoute");
        const fetchSession = async () => {
            const { data: { session } } = await supabaseSession.auth.getSession();
            setSession(session);
            setLoading(false);
        };
        fetchSession();

        const { data: { subscription } } = supabaseSession.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => subscription.unsubscribe();
    }, []);

    if (loading) return (
        <div className="h-screen overflow-y-hidden">
            <Loading />
        </div>
    )
    return session === null ? <Navigate to={PagesRoute.root} replace /> : <Outlet />;
};
export default ProtectedRoute;


