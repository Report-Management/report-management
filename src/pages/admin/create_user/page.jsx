import {Button, Checkbox, Dropdown, Label, Modal, Spinner, Table, TextInput} from "flowbite-react";
import {AdminCreateUserRepository, userData} from "./repository.js";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setLoading, setPassword, setUserRole, setUsername} from "./slice.js";
import {toast} from "react-toastify";

export const AdminCreateUserView = () => {
    const [openModal, setOpenModal] = useState(false);
    const { email, password, error, loading, userRole, username} = useSelector((state) => state.create_user);
    const dispatch = useDispatch()

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
        }
    };

    return (
        <div className="p-5 px-10">
            <div className="py-3 font-bold flex flex-row justify-between">
                <h1 className="text-2xl font-bold uppercase text-gray-900 dark:text-white">Create Account</h1>
                <Button
                    onClick={() => setOpenModal(true)}
                >
                    Add Account
                </Button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {userData.map((user, index) => (
                        <Table.Row
                            key={index}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {user.id}
                            </Table.Cell>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.role}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Account</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username" value="Username" />
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
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="name@@rupp.edu.kh"
                                value={email}
                                onChange={(e) => dispatch(setEmail(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => dispatch(setPassword(e.target.value))}
                                required />
                        </div>
                        <div className="flex flex-row justify-between items-center bg-gray-100 dark:bg-gray-300 py-1.5 px-1.5 rounded-xl">
                            <Label>
                                Account Type
                            </Label>
                            <Button.Group  aria-disabled={true}>
                                <Button color="gray" onClick={() => dispatch(setUserRole('User'))}>User</Button>
                                <Button color="gray" onClick={() => dispatch(setUserRole('Admin'))}>Admin</Button>
                            </Button.Group>
                        </div>
                        <Button
                            type="submit"
                            className="w-full justify-center"
                            size="md"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? <Spinner color="success" /> : <p> Submit </p>}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}