import {Spinner} from 'flowbite-react';
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setLoading, setPassword} from "../../pages/auth/auth_slice.js";
import {AuthRepository} from "../../pages/auth/auth_repository.js";
import {PagesRoute} from "../../routes.jsx";
import {Link} from "react-router-dom";

export const LoginForm = () => {
    const {email, password, loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true))
        const authRepository = new AuthRepository();
        const result = await authRepository.getLogin(email, password);
        if(result === null) {
            dispatch(setLoading(false))
            return
        }
        dispatch(setLoading(false))
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <div className="w-full bg-white opacity-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 lg:w-[700px] sm:w-[500px]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <div className="mb-2 block">
                                    <label htmlFor="email">Email</label>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    className="input w-full bg-gray-100 dark:bg-gray-700"
                                    placeholder="name@rupp.edu.kh"
                                    value={email}
                                    onChange={(e) => dispatch(setEmail(e.target.value))}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <label htmlFor="password">Password</label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input w-full bg-gray-100 dark:bg-gray-700"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => dispatch(setPassword(e.target.value))}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            {/*<div className="flex items-start">*/}
                            {/*    <div className="flex items-center h-5">*/}
                            {/*        <Checkbox id="remember"/>*/}
                            {/*    </div>*/}
                            {/*    <div className="ml-3 text-sm">*/}
                            {/*        <Label htmlFor="remember">*/}
                            {/*            Remember me*/}
                            {/*        </Label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <Link to={PagesRoute.forget} className="dark:text-primary-500 text-primary-600 link text-blue-500"> Forgot password? </Link>
                        </div>
                        <motion.div
                            className="relative"
                            whileHover={{
                                scale: 1.025,
                                transition: {duration: 0.3}
                            }}
                            whileTap={{scale: 0.95}}
                        >
                            <button
                                type="submit"
                                className="btn bg-blue-600 hover:bg-blue-700 w-full justify-center text-white"
                                disabled={loading}
                            >
                                {loading ? <Spinner color="success"/> : <p> Submit </p>}
                            </button>
                        </motion.div>
                        {/*<p className="text-sm font-light text-gray-500">*/}
                        {/*    Don’t have an account yet?{" "}*/}
                        {/*    <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">*/}
                        {/*        Request Now*/}
                        {/*    </a>*/}
                        {/*</p>*/}
                    </form>
                </div>
            </div>
        </div>
    );
};
