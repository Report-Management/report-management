import './App.css'
import {useEffect, useState} from "react";
import {AuthView, ForgetForm, Loading, LoginForm, PagesRoute, ReportView, SearchView, UserView} from "./xcore";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {supabaseSession} from "./core/index.js";
import {AuthRepository} from "./pages/auth/auth_repository.js";
import {DoneView} from "./pages/user/done/pages.jsx";
import {CreateReportView} from "./pages/user/create/index.jsx";
import {AdminView} from "./pages/index.jsx";
import {AdminShowReportView} from "./pages/admin/show_report/page.jsx";
import {AdminDoneView} from "./pages/admin/done/index.jsx";
import {AdminCreateUserView} from "./pages/admin/create_user/index.jsx";
import {AdminDashboardView} from "./pages/admin/dashboard/index.jsx";
import {AdminSpamView} from "./pages/admin/spam/index.jsx";
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 3300);
    }, []);
    const [session, setSession] = useState(null)
    const navigate = useNavigate()
    const authRepo = new AuthRepository();
    useEffect(() => {

        supabaseSession.auth.getSession().then(async ({data: {session}}) => {
            setSession(session)
            if (session) {
                let role = await authRepo.getUserRole(session.user.id);
                console.log(role)
                if (role.role === "Admin") navigate(PagesRoute.admin, {replace: true});
                else navigate(PagesRoute.user, {replace: true});
            } else {
                navigate(-1);
            }
        })

        const {data: {subscription},} = supabaseSession.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)
            if (session) {
                let role = await authRepo.getUserRole(session.user.id);
                if (role.role === "Admin") navigate(PagesRoute.admin, {replace: true});
                else navigate(PagesRoute.user, {replace: true});
            } else {
                navigate(-1);
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
                <Route exact path={PagesRoute.root} element={<AuthView/>}>
                    <Route path={PagesRoute.root} element={<LoginForm/>}/>
                    <Route path={PagesRoute.forget} element={<ForgetForm/>}/>
                </Route>
                <Route exact path={PagesRoute.user} element={<UserView/>}>
                    <Route path={PagesRoute.user} element={<ReportView />}/>
                    <Route path={PagesRoute.done} element={<DoneView/>}/>
                    <Route path={PagesRoute.create} element={<CreateReportView/>}/>
                    <Route path={PagesRoute.search} element={<SearchView />} />
                </Route>
                <Route exact path={PagesRoute.admin} element={<AdminView/>}>
                    <Route path={PagesRoute.admin} element={<AdminShowReportView />} />
                    <Route path={PagesRoute.done_report} element={<AdminDoneView />}/>
                    <Route path={PagesRoute.create_user} element={<AdminCreateUserView />}/>
                    <Route path={PagesRoute.dashboard} element={<AdminDashboardView />}/>
                    <Route path={PagesRoute.spam_report} element={<AdminSpamView />} />
                </Route>
            </Routes>
        </main>
    );
}

export default App
