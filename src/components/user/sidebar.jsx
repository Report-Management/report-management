import { useState, useEffect } from 'react';
import {Button, Modal, Sidebar} from 'flowbite-react';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineFileDone } from 'react-icons/ai';
import {BiLogOut, BiMessageSquareAdd, BiSearchAlt} from 'react-icons/bi';
import logo from '../../assets/seo-report.png';
import {NavLink, useLocation} from "react-router-dom";
import {PagesRoute} from "../../routes.jsx";
import {supabaseSession} from "../../core/index.js";
import {HiOutlineExclamationCircle} from "react-icons/hi";

export const UserSideBar = () => {
    const [isCollapsed, setCollapsed] = useState(window.innerWidth < 768);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        console.log(location.pathname)

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onLogout = async () => {
        const {error} = await supabaseSession.auth.signOut()
        setOpenModal(false)
        if (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Sidebar aria-label="Sidebar with logo branding example" collapsed={isCollapsed}>
                <Sidebar.Logo href="#" img={logo} imgAlt="Report" className="font-bold font-mono text-purple-600">
                    REPORTS
                </Sidebar.Logo>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            icon={BiSearchAlt}
                            as={NavLink}
                            to={PagesRoute.search}
                            active={PagesRoute.user.concat('/', PagesRoute.search) === location.pathname}
                            className={`font-medium ${PagesRoute.user.concat('/', PagesRoute.search) === location.pathname ? 'text-purple-600' : ''}`}
                        >
                            Search
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={BiMessageSquareAdd}
                            as={NavLink}
                            to={PagesRoute.create}
                            active={PagesRoute.user.concat('/', PagesRoute.create) === location.pathname}
                            className={`font-medium ${PagesRoute.user.concat('/', PagesRoute.create) === location.pathname ? 'text-purple-600' : ''}`}
                        >
                            Create
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={
                                TbReportAnalytics
                            }
                            as={NavLink}
                            to={PagesRoute.user}
                            active={PagesRoute.user === location.pathname}
                            className={`font-medium ${PagesRoute.home === location.pathname ? 'text-purple-600' : ''}`}
                        >
                            Reports
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={AiOutlineFileDone}
                            as={NavLink}
                            to={PagesRoute.done}
                            active={PagesRoute.user.concat('/', PagesRoute.done) === location.pathname}
                            className={`font-medium ${PagesRoute.user.concat('/', PagesRoute.done) === location.pathname ? 'text-purple-600' : ''}`}
                        >
                            Done
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={BiLogOut}
                            className="font-medium"
                            onClick={() => setOpenModal(true)}
                        >
                            Sign Out
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
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
        </>
    );
};
