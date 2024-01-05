import {useState, useEffect} from 'react';
import {Modal, Sidebar} from 'flowbite-react';
import {BiLogOut} from 'react-icons/bi';
import logo from '../../assets/seo-report.png';
import {useLocation, useNavigate} from "react-router-dom";
import {PagesRoute} from "../../routes.jsx";
import {supabaseSession} from "../../core/index.js";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {RiSpam2Fill} from "react-icons/ri";
import {FaListCheck} from "react-icons/fa6";
import {GoReport} from "react-icons/go";
import {MdOutlineDoneAll} from "react-icons/md";
import {SiGoogleanalytics} from "react-icons/si";
import {IoMdPersonAdd} from "react-icons/io";

export const AdminSideBar = () => {
    const [isCollapsed, setCollapsed] = useState(window.innerWidth < 768);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
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
                <Sidebar.Logo href={PagesRoute.admin} img={logo} imgAlt="Report" className="font-bold font-rubik text-purple-600" onClick={() => {
                    navigate(PagesRoute.admin, {replace: true});
                }}>
                    ADMIN
                </Sidebar.Logo>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            icon={SiGoogleanalytics}
                            active={PagesRoute.admin.concat('/', PagesRoute.dashboard) === location.pathname}
                            className={`font-medium cursor-pointer ${PagesRoute.admin.concat('/', PagesRoute.dashboard) === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.dashboard, {replace: true})
                            }}
                        >
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={GoReport}
                            active={PagesRoute.admin === location.pathname}
                            className={`font-medium cursor-pointer ${PagesRoute.admin === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.admin, {replace: true})
                            }}
                        >
                            Report
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={FaListCheck}
                            active={PagesRoute.admin.concat('/', PagesRoute.approved) === location.pathname}
                            className={`font-medium cursor-pointer ${PagesRoute.admin.concat('/', PagesRoute.approved) === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.approved, {replace: true})
                            }}
                        >
                            Approved
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={MdOutlineDoneAll}
                            active={PagesRoute.admin.concat('/', PagesRoute.done_report) === location.pathname}
                            className={`font-medium cursor-pointer ${PagesRoute.admin.concat('/', PagesRoute.done_report) === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.done_report, {replace: true})
                            }}
                        >
                            Completed
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={RiSpam2Fill}
                            active={PagesRoute.admin.concat('/', PagesRoute.spam_report) === location.pathname}
                            className={`font-medium cursor-pointer ${PagesRoute.admin.concat('/', PagesRoute.spam_report) === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.spam_report, {replace: true})
                            }}
                        >
                            Spam
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={IoMdPersonAdd}
                            active={PagesRoute.admin.concat('/', PagesRoute.create_user) === location.pathname}
                            className={`font-medium cursor-pointer ${PagesRoute.admin.concat('/', PagesRoute.create_user) === location.pathname ? 'text-purple-600' : ''}`}
                            onClick={() => {
                                navigate(PagesRoute.create_user, {replace: true})
                            }}
                        >
                            Create Account
                        </Sidebar.Item>
                        <Sidebar.Item
                            icon={BiLogOut}
                            className="font-medium cursor-pointer"
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
                            <button className="btn btn-error text-white" onClick={onLogout}>
                                {"Yes, I'm sure"}
                            </button>
                            <button className="btn bg-gray-500 text-white" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
