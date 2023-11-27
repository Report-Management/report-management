import {useState, useEffect} from 'react';
import {Button, Modal, Sidebar} from 'flowbite-react';
import {TbReportAnalytics} from 'react-icons/tb';
import {AiOutlineFileDone} from 'react-icons/ai';
import {BiLogOut, BiMessageSquareAdd, BiSolidDashboard} from 'react-icons/bi';
import logo from '../../assets/seo-report.png';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {PagesRoute} from "../../routes.jsx";
import {supabaseSession} from "../../core/index.js";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {RiSpam2Fill} from "react-icons/ri";

export const AdminSideBar = () => {
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
    const navigate = useNavigate()

    const onLogout = async () => {
        const {error} = await supabaseSession.auth.signOut()
        navigate(PagesRoute.root, {replace: true});
        setOpenModal(false)
        if (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Sidebar aria-label="Sidebar with logo branding example" collapsed={isCollapsed}>
                <Sidebar.Logo href={PagesRoute.admin} img={logo} imgAlt="Report" className="font-bold font-mono text-purple-600" onClick={() => {
                    navigate(PagesRoute.admin, {replace: true});
                }}>
                    ADMIN
                </Sidebar.Logo>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            icon={BiSolidDashboard}
                            active={PagesRoute.admin.concat('/', PagesRoute.dashboard) === location.pathname}
                            className={`font-medium ${PagesRoute.admin.concat('/', PagesRoute.dashboard) === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.dashboard, {replace: true})
                            }}
                        >
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={
                                TbReportAnalytics
                            }
                            active={PagesRoute.admin === location.pathname}
                            className={`font-medium ${PagesRoute.admin === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.admin, {replace: true})
                            }}
                        >
                            Reports
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={AiOutlineFileDone}
                            active={PagesRoute.admin.concat('/', PagesRoute.done_report) === location.pathname}
                            className={`font-medium ${PagesRoute.admin.concat('/', PagesRoute.done_report) === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.done_report, {replace: true})
                            }}
                        >
                            Done
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={BiMessageSquareAdd}
                            active={PagesRoute.admin.concat('/', PagesRoute.create_user) === location.pathname}
                            className={`font-medium ${PagesRoute.admin.concat('/', PagesRoute.create_user) === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.create_user, {replace: true})
                            }}
                        >
                            Create Account
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={RiSpam2Fill}
                            active={PagesRoute.admin.concat('/', PagesRoute.spam_report) === location.pathname}
                            className={`font-medium ${PagesRoute.admin.concat('/', PagesRoute.spam_report) === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.spam_report, {replace: true})
                            }}
                        >
                            Spam
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
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle
                            className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
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
