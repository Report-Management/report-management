import {Avatar, Dropdown, Modal, Navbar} from 'flowbite-react';
import logo from '../../assets/seo-report.png';
import man from '../../assets/man.png'
import {useNavigate} from "react-router-dom";
import {PagesRoute} from "../../routes.jsx";
import PropTypes, {string} from "prop-types";
import {supabaseSession} from "../../core/index.js";
import {useEffect, useState} from "react";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {toast} from "react-toastify";
import {UserRepository} from "../../pages/user/repository.js";

export const NavigationBar = (props) => {
    const navigator = useNavigate();
    const userRepository = new UserRepository();
    const [username, setUsername] = useState(props.username);
    const [name, setName] = useState(props.username);

    const [urlProfile, setUrl] = useState(props.profilePhoto);
    const [inputUrl, setInput] = useState(props.profilePhoto);

    const onLogout = async () => {
        const {error} = await supabaseSession.auth.signOut();
        navigator(PagesRoute.root, {replace: true});
        if (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setUsername(props.username)
        setInput(props.profilePhoto)
    }, [])

    async function onChangeName(e) {
        e.preventDefault();
        const result = await userRepository.updateUsername(name);
        if (result === true) {
            toast.success("Change username successfully")
            setUsername(name)
        }
    }

    async function onChangeProfile(e) {
        e.preventDefault();
        const result = await userRepository.updateProfile(inputUrl);
        if (result === true) {
            toast.success("Change profile successfully")
            setUrl(inputUrl)
        }
    }


    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <nav className="h-1/2 w-full">
                <Navbar className="w-full px-8 bg-gray-50 dark:bg-gray-800">
                    <div className="md:hidden">
                        <Navbar.Brand>
                            <div className="flex flex-row justify-center items-center">
                                <div className="h-10 sm:h-9">
                                    <img src={logo} className="mr-3 h-10 sm:h-9 mb-3.5" alt="Report"/>
                                </div>
                                <span className="font-bold text-xl font-rubik">REPORTS</span>
                            </div>
                        </Navbar.Brand>
                    </div>
                    <div className="md:flex md:flex-row justify-between items-center md:w-full">
                        <div className="hidden md:block">
                            <span id={"username"} className="text-lg font-semibold"> {username}</span>
                        </div>
                        <div className="hidden md:block">
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar
                                        alt="User settings"
                                        img={urlProfile ?? man}
                                        size="md"
                                        rounded bordered
                                    />
                                }>
                                <Dropdown.Header>
                                    <span className="block text-sm font-rubik">{username ?? 'Bonnie Green'}</span>
                                    <span
                                        className="block truncate text-sm font-medium">{props.email ?? 'name@rupp.edu.kh'}</span>
                                </Dropdown.Header>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={() => {
                                    document.getElementById('my_modal_1').showModal()
                                }}> Change Username</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    document.getElementById('my_modal_2').showModal()
                                }}> Change Profile</Dropdown.Item>
                            </Dropdown>
                        </div>
                        <div className="md:hidden">
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar
                                        alt="User settings"
                                        img={urlProfile ?? man}
                                        size="md"
                                        rounded bordered
                                    />
                                }>
                                <Dropdown.Header>
                                    <span className="block text-sm font-rubik">{username ?? 'Bonnie Green'}</span>
                                    <span
                                        className="block truncate text-sm font-medium">{props.email ?? 'name@rupp.edu.kh'}</span>
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
            </nav>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Change Username</h3>
                    <form onSubmit={onChangeName}>
                        <div className="pt-3">
                            <input
                                className="input w-full bg-gray-100"
                                placeholder="New Username"
                                type="text"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="modal-action space-x-2">
                            <button className="btn btn-success text-white" type="submit">
                                Save
                            </button>
                            <button className="btn" type="button" onClick={() => document.getElementById('my_modal_1').close()}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Change Profile</h3>
                    <form onSubmit={onChangeProfile}>
                        <div className="pt-3">
                            <input
                                className="input w-full bg-gray-100"
                                placeholder="URL...."
                                type="text"
                                value={inputUrl}
                                pattern="https?://.+"
                                title="Please enter a valid URL starting with http:// or https://"
                                required
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <div className="modal-action space-x-2">
                            <button className="btn btn-success text-white" type="submit">
                                Save
                            </button>
                            <button className="btn" type="button" onClick={() => document.getElementById('my_modal_2').close()}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

NavigationBar.propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    profilePhoto: PropTypes.string
}

NavigationBar.defaultProps = {
    username: 'Bonnie Green',
    email: 'name@rupp.edu.kh',
}