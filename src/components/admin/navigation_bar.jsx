import {Avatar, Dropdown, Navbar} from 'flowbite-react';
import logo from '../../assets/seo-report.png';
import profile from '../../assets/user.png';
import PropTypes from "prop-types";
import {UserRepository} from "../../pages/user/repository.js";
import {useEffect, useState} from "react";
import {supabaseSession} from "../../core/index.js";
import {PagesRoute} from "../../routes.jsx";
import {toast} from "react-toastify";
import man from "../../assets/man.png";

export const AdminNavigationBar = (props) => {

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
                <Navbar className="w-full px-0 md:px-6 bg-gray-50 dark:bg-gray-800">
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
                    <div className="hidden md:flex md:flex-row justify-between md:w-full items-center">
                        <div
                            className="space-y-1 font-semibold dark:text-white text-md text-start hidden md:block font-rubik">
                            <div> {username} </div>
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
                    </div>
                </Navbar>
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

AdminNavigationBar.propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    profilePhoto: PropTypes.string,
}

AdminNavigationBar.defaultProps = {
    username: 'User Name',
    email: 'name@rupp.edu.kh',
    profile: 'https://i.pinimg.com/originals/9f/c3/c2/9fc3c2d2989592e70c9464b23195a11c.jpg',
}