import {Button, Checkbox, Label, TextInput} from "flowbite-react";
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
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <button onClick={() => navigate(-1)} className="py-3">
                        <LuArrowLeft />
                    </button>
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        <div>
                            <Label>
                                Your email
                            </Label>
                            <TextInput
                                type="email"
                                name="email"
                                id="email"
                                placeholder="name@rupp.edu.kh"
                            />
                        </div>
                        <div>
                            <Label>
                                New Password
                            </Label>
                            <TextInput
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <Label>
                                Confirm password
                            </Label>
                            <TextInput
                                type="confirm-password"
                                name="confirm-password"
                                id="confirm-password"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <Checkbox id="remember"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <Label>
                                    I accept the{" "}
                                    <a
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        href="#"
                                    >
                                        Terms and Conditions
                                    </a>
                                </Label>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Reset password
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};
