import { Badge, Card, Modal, Spinner} from "flowbite-react";
import {AdminCreateUserRepository, AdminUserRepository,} from "./repository.js";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setLoading, setPassword, setUserRole, setUsername, setListUsers, setImage, setUserId} from "./slice.js";
import {toast} from "react-toastify";
import {Loading} from "../../../components/index.jsx";
import man from "../../../assets/user.png";
import {MdDelete} from "react-icons/md";
import {motion} from "framer-motion";
import {PiPasswordBold} from "react-icons/pi"
export const AdminCreateUserView = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isShowPass, setShowPassword] = useState(true);
    const {email, password, loading, userRole, username, listUsers, image, userId} = useSelector((state) => state.create_user);
    const dispatch = useDispatch();
    const [openUser, setUserModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
        dispatch(setEmail(''))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true))
        const authRepo = new AdminCreateUserRepository();
        const result = await authRepo.createAccount(
            username,
            email,
            password.toString(),
            userRole,
        )
        dispatch(setLoading(false))
        if (result !== null) {
            onCloseModal()
            toast('Account Created Successfully', {
                type: 'success'
            })
            fetchUsers();
        }
    };

    function handleRoleChange(e) {
        dispatch(setUserRole(e.target.value))
    }

    async function fetchUsers() {
        dispatch(setLoading(true));
        const adminRepo = new AdminUserRepository();
        try {
            const result = await adminRepo.getUsers();
            if (result !== null) {
                dispatch(setListUsers(result));
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            dispatch(setLoading(false));
        }
    }


    function onOpenUserModal(index) {
        dispatch(setUserId(listUsers[index].id))
        dispatch(setEmail(listUsers[index].email))
        dispatch(setUsername(listUsers[index].name))
        dispatch(setUserRole(listUsers[index].role))
        dispatch(setImage(listUsers[index].profilePhoto))
        setUserModal(true)
    }

    function onOpenModal() {
        setOpenModal(true)
        dispatch(setUserId(null))
        dispatch(setEmail(''))
        dispatch(setUsername(''))
        dispatch(setPassword(''))
        setShowPassword(false)
        dispatch(setUserRole('User'))
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function onUpdateUser(e) {
        e.preventDefault();
        const adminRepo = new AdminUserRepository();
        const result = await adminRepo.onUpdateUser(userId, userRole);
        if (result === true){
            toast.success("Updated")
            fetchUsers()
        }
    }

    async function onDeleteUser(e) {
        e.preventDefault();
        const adminRepo = new AdminUserRepository();
        const result = await adminRepo.onDeleteUser(userId);
        if (result === true){
            toast.success("Deleted")
            setUserModal(false)
            fetchUsers();
        }

    }

    function onGeneratePassword(e){
        e.preventDefault()
        const password = Math.floor(100000 + Math.random() * 900000);
        dispatch(setPassword(password))
    }

    if(loading) return (
        <Loading />
    )
    return (
        <div className="p-5 px-10">
            <div className="py-2 font-bold flex flex-row justify-between">
                <h1 className="text-2xl font-bold uppercase text-gray-900 dark:text-white">Create Account</h1>
                <button
                    className="btn bg-gray-200 dark:bg-white dark:text-black hover:bg-white"
                    onClick={onOpenModal}
                >
                    Add Account
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {listUsers.map((user, index) => (
                    <motion.div
                        key={user.id}
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.2}}
                    >
                        <Card key={user.id} className="max-w-lg" onClick={() => onOpenUserModal(index)}>
                            <div className="relative">
                                <div className="h-60">
                                    <img
                                        className={`w-full h-full object-cover rounded-lg ${user.profilePhoto ? '' : 'bg-gray-50 p-3'}`}
                                        src={user.profilePhoto ?? man}
                                        alt="profile"
                                    />
                                </div>
                                <div className="absolute top-2 right-2">
                                    {user.role === 'Admin' ? (
                                        <Badge color="purple">{user.role}</Badge>
                                    ) : (
                                        <Badge color="success">{user.role}</Badge>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-purple-800 dark:text-purple-300 font-semibold font-sans text-xl truncate">{user.name}</div>
                                <div className="text-gray-500 dark:text-white font-normal text-sm truncate">{user.email}</div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-lg">
                    <h3 className="font-bold text-lg">Confirm</h3>
                    <p className="py-4 text-lg">Are you sure to remove this user ?</p>
                    <div className="modal-action">
                        <form method="dialog" className="space-x-3">
                            <button className="btn">Close</button>
                            <button className="btn bg-warning" onClick={onDeleteUser}>Confirm</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <Modal key={1} show={openUser} size="md" onClose={() => setUserModal(false)}>
                <Modal.Header> User Information </Modal.Header>
                <Modal.Body>
                    <img
                        className={`w-full h-full object-contain rounded-lg ${image ? '' : 'bg-gray-100 p-2'}`}
                        src={image ?? man}
                        alt="profile"
                    />
                    <div className="py-2 space-y-3 max-w-lg">
                        <div className="pb-2 space-y-1">
                            <div className="text-purple-800 dark:text-purple-300 font-semibold font-sans text-xl truncate"> { username } </div>
                            <div className="text-gray-500 dark:text-white font-normal text-sm truncate"> { email } </div>
                        </div>
                        <select id="role" value={userRole} onChange={handleRoleChange} className="select w-full bg-gray-100 dark:bg-gray-700 dark:border-2 dark:border-gray-500">
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <div className="flex flex-row justify-between items-center space-x-3 pt-3">
                            <button className="btn bg-red-500 w-1/4" onClick={()=>document.getElementById('my_modal_4').showModal()}>
                                <MdDelete size="24" color="white" />
                            </button>
                            <button className="btn btn-warning flex-1 max-w-xs" type="submit" onClick={onUpdateUser}>
                                Update
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal key={2} show={openModal} size="md" onClose={onCloseModal}>
                <Modal.Header> Create Account </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 block">
                                    <label htmlFor="username">Username</label>
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    className="input w-full bg-gray-100 dark:bg-gray-800"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => dispatch(setUsername(e.target.value))}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <label htmlFor="email">Email</label>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    className="input w-full bg-gray-100 dark:bg-gray-800"
                                    placeholder="name@rupp.edu.kh"
                                    value={email}
                                    onChange={(e) => dispatch(setEmail(e.target.value))}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 flex flex-row justify-between">
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="flex flex-row items-center space-x-2">
                                    <input
                                        id="password"
                                        type="text"
                                        className="input w-full max-w-xs bg-gray-100 dark:bg-gray-800"
                                        required
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => dispatch(setPassword(e.target.value))}
                                    />
                                    <button className="btn" onClick={onGeneratePassword}>
                                        <PiPasswordBold />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-start space-y-1">
                                <label htmlFor="role"> Role </label>
                                <select className="select bg-gray-100 dark:bg-gray-800 w-full" value={userRole}  onChange={handleRoleChange}>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full justify-center btn bg-blue-700 text-white hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? <Spinner color="success"/> : <p> Submit </p>}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}