import {Outlet} from "react-router-dom";
import {AdminSideBar} from "../../components/admin/sidebar.jsx";

export const AdminView = () => {
    return (
        <div>
            <div className="flex h-screen">
                <div>
                    <AdminSideBar/>
                </div>

                <div className="w-screen">
                    <div className="relative">
                        <div className="overflow-scroll h-screen">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}