import {Avatar, Badge, Button, Card, Label, Modal, Select, Spinner, Table, TextInput} from "flowbite-react";
import {AdminCreateUserRepository, AdminUserRepository,} from "./repository.js";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setLoading, setPassword, setUserRole, setUsername, setListUsers, setImage} from "./slice.js";
import {toast} from "react-toastify";
import {Loading} from "../../../components/index.jsx";
import man from "../../../assets/user.png";
import {MdDelete} from "react-icons/md";
import {BiHide, BiShow} from "react-icons/bi";
import {motion} from "framer-motion";

export const AdminCreateUserView = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isShowPass, setShowPassword] = useState(true);
    const {email, password, loading, userRole, username, listUsers, image} = useSelector((state) => state.create_user);
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
            password,
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
        console.log(userRole)
    }

    async function fetchUsers() {
        dispatch(setLoading(true));
        const adminRepo = new AdminUserRepository();
        try {
            const result = await adminRepo.getUsers();
            if (result !== null) {
                dispatch(setListUsers(result));
                console.log(result);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            dispatch(setLoading(false));
        }
    }


    function onOpenUserModal(index) {
        dispatch(setEmail(listUsers[index].email))
        dispatch(setUsername(listUsers[index].name))
        dispatch(setUserRole(listUsers[index].role))
        dispatch(setImage(listUsers[index].profilePhoto))
        setUserModal(true)
    }

    function onOpenModal() {
        setOpenModal(true)
        dispatch(setEmail(''))
        dispatch(setUsername(''))
        dispatch(setPassword(''))
        setShowPassword(false)
        dispatch(setUserRole('User'))
    }

    useEffect(() => {
        fetchUsers();
    }, []);



    if(loading) return (
        <Loading />
    )
    return (
        <div className="p-5 px-10">
            <div className="py-2 font-bold flex flex-row justify-between">
                <h1 className="text-2xl font-bold uppercase text-gray-900 dark:text-white">Create Account</h1>
                <Button
                    onClick={onOpenModal}
                >
                    Add Account
                </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {listUsers.map((user, index) => (
                    <motion.div
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.2}}
                    >
                        <Card key={user.id} className="max-w-lg" onClick={() => onOpenUserModal(index)}>
                            <div className="relative">
                                <div className="h-60">
                                    <img
                                        className={`w-full h-full object-cover rounded-lg ${user.profilePhoto ? '' : 'bg-gray-100 p-3'}`}
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
            <Modal key={1} show={openUser} size="md" onClose={() => setUserModal(false)}>
                <Modal.Header> User Information </Modal.Header>
                <Modal.Body>
                    <img
                        className={`w-full h-full object-contain rounded-lg ${image ? '' : 'bg-gray-100 p-2'}`}
                        src={image ?? man}
                        alt="profile"
                    />
                    <div className="py-2 space-y-3">
                        <div className="pb-2 space-y-1">
                            <div className="text-purple-800 dark:text-purple-300 font-semibold font-sans text-xl truncate"> { username } </div>
                            <div className="text-gray-500 dark:text-white font-normal text-sm truncate"> { email } </div>
                        </div>
                        <Select id="role" value={userRole} onChange={handleRoleChange}>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </Select>
                        <div className="flex flex-row justify-between items-center space-x-3 pt-3">
                            <Button className="bg-red-500 w-1/4" color="none">
                                <MdDelete size="24" color="white" />
                            </Button>
                            <Button className="w-full">
                                Update
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal key={2} show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header/>
                <Modal.Body>
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Account</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username" value="Username"/>
                            </div>
                            <TextInput
                                id="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => dispatch(setUsername(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email"/>
                            </div>
                            <TextInput
                                id="email"
                                placeholder="name@rupp.edu.kh"
                                value={email}
                                onChange={(e) => dispatch(setEmail(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 flex flex-row justify-between">
                                <Label htmlFor="password" value="Password" />
                                {isShowPass ? (
                                    <BiShow
                                        size="24"
                                        color="gray"
                                        onClick={() => {
                                            setShowPassword(!isShowPass)
                                            console.log(isShowPass)
                                        }}
                                    />
                                ) : (
                                    <BiHide
                                        size="24"
                                        color="gray"
                                        onClick={() => {
                                            setShowPassword(!isShowPass)
                                            console.log(isShowPass)
                                        }}
                                    />
                                )}
                            </div>
                            <TextInput
                                id="password"
                                type={isShowPass ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => dispatch(setPassword(e.target.value))}
                                required/>
                        </div>
                        <div>
                            <Label htmlFor="role" value="Role"/>
                            <Select id="role" value={userRole} onChange={handleRoleChange}>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </Select>
                        </div>
                        <Button
                            type="submit"
                            className="w-full justify-center"
                            size="md"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? <Spinner color="success"/> : <p> Submit </p>}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}