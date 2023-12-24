import {LuArrowLeft} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {supabaseSession} from "../../core/index.js";

export const ForgetForm = () => {
    const navigate = useNavigate();

    supabaseSession.auth.onAuthStateChange(async (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
            const newPassword = prompt("What would you like your new password to be?");
            const { data, error } = await supabaseSession.auth.update({
                password: newPassword,
            })

            if (data) alert("Password updated successfully!")
            if (error) alert("There was an error updating your password.")
        }
    })
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
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        <div className="space-y-2">
                            <label htmlFor="email"> Your Email </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="input w-full bg-gray-100 dark:bg-gray-700"
                                placeholder="name@rupp.edu.kh"
                            />
                        </div>
                        <button type="submit" className="w-full btn bg-blue-500 text-white hover:bg-blue-600">
                            Reset password
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};
