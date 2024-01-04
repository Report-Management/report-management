import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {ResetPasswordRepository} from "./repository.js";
import {Loading} from "../../../components/index.jsx";

export const ResetPasswordView = () => {
    const [params] = useSearchParams();
    const [param, setParam] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const forgetRepository = new ResetPasswordRepository()
    const [isFinish, setFinish] = useState(false)

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password match

    useEffect(() => {
        if (params.size === 0) {
            return;
        }

        setParam(Object.fromEntries([...params]));
    }, []);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);

        // Check if passwords match and update state
        setPasswordsMatch(e.target.value === password);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    async function handleSubmit (e) {
        e.preventDefault();

        // Validate password length and matching passwords
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.')
            return;
        }

        if (!passwordsMatch) {
            alert('Passwords do not match.');
            return;
        }

        setLoading(true)
        const result = await forgetRepository.onChangePassword(confirmPassword, param.verify)
        if (result) {
            setFinish(true)
        }
        setLoading(false)
    }

    if (params.size === 0) {
        return (
            <div className="w-full h-screen flex justify-center items-center overflow-y-hidden">
                <div>No Verify email</div>
            </div>
        );
    }

    if (isLoading) return (
        <div className="h-screen overflow-y-hidden">
            <Loading/>
        </div>
    )

    return (
        <div className="w-full h-screen flex justify-center items-center overflow-y-hidden">
            <div className="max-w-sm w-full">
                <div className="p-6">
                    <div
                        className="font-bold font-rubik text-3xl text-center w-full uppercase bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"> Report
                        Management System
                    </div>
                </div>
                {
                    isFinish ? <div className="uppercase text-center font-bold font-rubik text-lg text-green-500"> Successfully </div> : <form onSubmit={handleSubmit}>
                        <label htmlFor="password" className="block mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`input w-full bg-gray-100 dark:bg-gray-700 mb-2 ${
                                    (!passwordsMatch && password.trim() !== '') ? 'input-error' : (password.trim() !== '') ? 'input-success' : ''
                                }`}
                                placeholder="New password"
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
                                onClick={handleTogglePasswordVisibility}
                            >
                                {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                            </button>
                        </div>
                        <label htmlFor="confirmPassword" className="block mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={`input w-full bg-gray-100 dark:bg-gray-700 mb-4 ${
                                    (!passwordsMatch && confirmPassword.trim() !== '') ? 'input-error' : (confirmPassword.trim() !== '') ? 'input-success' : ''
                                }`}
                                placeholder="Confirm password"
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
                                onClick={handleToggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                            </button>
                        </div>

                        <button type="submit"
                                className="btn w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 text-md">
                            Update
                        </button>
                    </form>
                }
            </div>
        </div>
    );
};
