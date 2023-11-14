import {AuthView, LoginForm, ForgetForm, UserView, ReportView, SearchView, AdminView} from "./pages/index.jsx";
import {DoneView} from "./pages/user/done/pages.jsx";
import {CreateReportView} from "./pages/user/create/index.jsx";
import {AdminShowReportView} from "./pages/admin/show_report/page.jsx";
import {AdminDashboardView} from "./pages/admin/dashboard/index.jsx";
import {AdminCreateUserView} from "./pages/admin/create_user/index.jsx";
import {AdminDoneView} from "./pages/admin/done/index.jsx";

export class PagesRoute {
    static root = "/";
    static forget = "forget";

    // User Route
    static user = "/user";
    static done = "done";
    static create = "create_report";
    static search = "search";

    // Admin Route
    static admin = "/admin";
    static dashboard = "dashboard";
    static create_user = "create_user";
    static done_report = "done_report";


    static routeConfig = [
        {
            path: PagesRoute.root,
            element: <AuthView />,
            routes: [
                { path: PagesRoute.root, element: <LoginForm /> },
                { path: PagesRoute.forget, element: <ForgetForm /> },
            ],
        },
        {
            path: PagesRoute.user,
            element: <UserView />,
            routes: [
                {path: PagesRoute.user, element: <ReportView/>},
                {path: PagesRoute.done, element: <DoneView/>},
                {path: PagesRoute.create, element: <CreateReportView/>},
                {path: PagesRoute.search, element: <SearchView/>},
            ],
        },
        {
            path: PagesRoute.admin,
            element: <AdminView />,
            routes: [
                {path: PagesRoute.admin, element: <AdminShowReportView/>},
                {path: PagesRoute.dashboard, element: <AdminDashboardView/>},
                {path: PagesRoute.create_user, element: <AdminCreateUserView/>},
                {path: PagesRoute.done_report, element: <AdminDoneView/>}
            ],
        }
    ];
}

