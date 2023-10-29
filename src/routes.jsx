import { AuthView, LoginForm, ForgetForm } from "./pages";

export class PagesRoute {
    static root = "/";
    static sign_in = "sign_in";
    static forget = "forget";
    static all_report = "reports";

    static routeConfig = [
        {
            path: PagesRoute.root,
            element: <AuthView />,
            routes: [
                { path: PagesRoute.root, element: <LoginForm /> },
                { path: PagesRoute.forget, element: <ForgetForm /> },
            ],
        },
    ];
}

