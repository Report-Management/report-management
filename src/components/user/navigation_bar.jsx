import {Avatar, Button, Dropdown, Modal, Navbar, TextInput} from 'flowbite-react';
import logo from '../../assets/seo-report.png';
import {NavLink, useLocation} from "react-router-dom";
import {PagesRoute} from "../../routes.jsx";
import {motion} from "framer-motion";
import {supabaseSession} from "../../core/index.js";
import {useEffect, useState} from "react";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {DropdownSelect} from "./dropdown.jsx";

export const NavigationBar = () => {
    const location = useLocation();

    const onLogout = async () => {
        const {error} = await supabaseSession.auth.signOut()
        if (error) {
            console.log(error)
        }
    }

    const [openModal, setOpenModal] = useState(false);
    const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);
    const handleDropdownSelect = (option) => {
        setSelectedDropdownOption(option);
        console.log(selectedDropdownOption)
    };

    useEffect(() => {
        console.log(selectedDropdownOption)
    }, [selectedDropdownOption]);

    return (
        <nav className="h-1/2 p-3 flex flex-row justify-end dark:bg-transparent">
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings" img="https://cdn-icons-png.flaticon.com/512/9131/9131478.png" rounded/>
                }>
                <Dropdown.Header>
                    <span className="block text-sm">Bonnie Green</span>
                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
        </nav>
    );
}
