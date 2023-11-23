import {DashboardRepository} from "./repository.js";
import {Button} from "flowbite-react";
import {useState} from "react";

export const AdminDashboardView = () => {
    const [userRole, setUserRole] = useState(null);

    async function onGetUserRole() {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getUserRole("2936ecda-34b4-4b07-9fa6-b8d63d7583e4");
        if(result !== null) {
            setUserRole(result);
        }
    }

    async function getLoginUser() {
        const dashboardRepository = new DashboardRepository();
        const result = await dashboardRepository.getLogin("lim.phanith.2821@rupp.edu.kh", "qazxsw123")
        if(result !== null) {
            setUserRole(result.token);
        }
    }

    return (
        <div>
            <h1>my Dashboard</h1>
            <Button onClick={getLoginUser}>Get User Role</Button>
            <p>{userRole}</p>
        </div>
    );
}