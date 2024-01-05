import './App.css'
import React, {useEffect, useState} from "react";
import {AuthView, ForgetForm, Loading, LoginForm, PagesRoute, ReportView, UserView} from "./xcore";
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
import {AdminApprovedView} from "./pages/admin/approved/index.jsx";
import {MyReportView} from "./pages/user/myreport/page.jsx";
import {NotFoundPage} from "./pages/notfound/index.jsx";
import {ResetView} from "./pages/reset/page.jsx";
import ProtectedRoute from "./protection/protection.jsx";
import {ResetPasswordView} from "./pages/reset/reset-password/page.jsx";

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
                if (role.role === "Admin") navigate(PagesRoute.admin, {replace: true});
                else navigate(PagesRoute.user, {replace: true});
            }
        })

        const {data: {subscription},} = supabaseSession.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)
            if( _event === "SIGNED_IN") {
                let role = await authRepo.getUserRole(session.user.id);
                if (role.role === "Admin") navigate(PagesRoute.admin, {replace: true});
                else navigate(PagesRoute.user, {replace: true});

            } else if (_event === "SIGNED_OUT") {
                navigate(PagesRoute.root, {replace: true});
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return <div className="container mx-auto max-h-screen h-screen overflow-hidden">
            <Loading/>;
        </div>
    }
    return (
        <main>
            <ToastContainer
                autoClose={2000}
            />
            <Routes>
                <Route path={PagesRoute.reset} element={<ResetView/>}/>
                <Route exact path={PagesRoute.root} element={<AuthView/>}>
                    <Route index element={<LoginForm/>}/>
                    <Route path={PagesRoute.forget} element={<ForgetForm/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
                <Route element={<ProtectedRoute/>}>
                    <Route path={PagesRoute.admin} element={<AdminView/>}>
                        <Route index element={<AdminShowReportView/>}/>
                        <Route path={PagesRoute.approved} element={<AdminApprovedView/>}/>
                        <Route path={PagesRoute.done_report} element={<AdminDoneView/>}/>
                        <Route path={PagesRoute.create_user} element={<AdminCreateUserView/>}/>
                        <Route path={PagesRoute.dashboard} element={<AdminDashboardView/>}/>
                        <Route path={PagesRoute.spam_report} element={<AdminSpamView/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Route>
                    <Route path={PagesRoute.user} element={<UserView/>}>
                        <Route index element={<ReportView />}/>
                        <Route path={PagesRoute.done} element={<DoneView/>}/>
                        <Route path={PagesRoute.create} element={<CreateReportView/>}/>
                        <Route path={PagesRoute.myreport} element={<MyReportView/>}/>
                    </Route>
                </Route>
                <Route path="/reset-password" element={<ResetView />}>
                    <Route index element={<ResetPasswordView />} />
                </Route>
            </Routes>
        </main>
    );
}

export default App
