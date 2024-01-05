import {LuArrowLeft} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Spinner} from "flowbite-react";
import {toast} from "react-toastify";
import {ForgetRepository} from "./repository.js";

export const ForgetForm = () => {
    const navigate = useNavigate();
    const authRepository = new ForgetRepository();
    const [isLoading, setLoading] = useState(false)
    const [Email, setEmail] = useState('')


    async function onSentForgetPassword (e) {
        e.preventDefault();
        setLoading(true)
        const result = await authRepository.getVerifyEmail(Email)
        if(result === true) {
            toast.success("Please check your email")
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <div className="w-full bg-white opacity-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 lg:w-[700px] sm:w-[500px]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <button onClick={() => navigate(-1)} className="py-3 btn">
                        <LuArrowLeft />
                    </button>
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={onSentForgetPassword}>
                        <div className="space-y-2">
                            <label htmlFor="email"> Your Email </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={Email}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setEmail(e.target.value)
                                }}
                                className="input w-full bg-gray-100 dark:bg-gray-700"
                                placeholder="name@rupp.edu.kh"
                                disabled={isLoading}
                            />
                        </div>
                        <button type="submit" className="w-full btn bg-blue-500 text-white hover:bg-blue-600">

                            {isLoading ? <Spinner color="success"/> : <p> Reset password </p>}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};
