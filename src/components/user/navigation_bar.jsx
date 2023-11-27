import {Avatar, Button, Dropdown, Modal, Navbar} from 'flowbite-react';
import logo from '../../assets/seo-report.png';
import {NavLink, useNavigate} from "react-router-dom";
import {PagesRoute} from "../../routes.jsx";
import PropTypes from "prop-types";
import {supabaseSession} from "../../core/index.js";
import {useEffect, useState} from "react";
import {HiOutlineExclamationCircle} from "react-icons/hi";

export const NavigationBar = (props) => {
    const navigator = useNavigate();
    const onLogout = async () => {
        const {error} = await supabaseSession.auth.signOut();
        navigator(PagesRoute.root, {replace: true});
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
        <nav className="h-1/2 w-full">
            <Navbar className="w-full px-8 bg-gray-50 dark:bg-gray-800">
                <div className="md:hidden">
                    <Navbar.Brand>
                        <div className="flex flex-row justify-center items-center">
                            <div className="h-10 sm:h-9">
                                <img src={logo} className="mr-3 h-10 sm:h-9 mb-3.5" alt="Report"/>
                            </div>
                            <span className="font-bold font-mono text-xl">REPORTS</span>
                        </div>
                    </Navbar.Brand>
                </div>
                <div className="md:flex md:flex-row justify-between items-center md:w-full">
                    <div className="hidden md:block">
                        <span className="text-lg font-semibold">LIM Phanith</span>
                    </div>
                    <div className="hidden md:block">
                        <Avatar
                            className="object-contain"
                            alt="User settings"
                            placeholderInitials="LP"
                            img={props.img}
                            size="md"
                            rounded bordered
                        />
                    </div>
                    <div className="md:hidden">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    className="object-none"
                                    alt="User settings"
                                    placeholderInitials="LP"
                                    img={props.img}
                                    size="md"
                                    rounded bordered
                                />
                            }>
                            <Dropdown.Header>
                                <span className="block text-sm">{ props.username ?? 'Bonnie Green' }</span>
                                <span className="block truncate text-sm font-medium">{ props.email ?? 'name@rupp.edu.kh' }</span>
                            </Dropdown.Header>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={() => setOpenModal(true)}>Sign out</Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </Navbar>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                position="center"
                popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to logout ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={onLogout}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </nav>
    );
}

NavigationBar.propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    img: PropTypes.string
}

NavigationBar.defaultProps = {
    username: 'Bonnie Green',
    email: 'name@rupp.edu.kh',
    img: "https://i.pravatar.cc/150?img=3"
}