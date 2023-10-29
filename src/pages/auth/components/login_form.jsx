import {Button, Label, TextInput, Checkbox, Spinner} from 'flowbite-react';
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {PagesRoute} from "../../../xcore";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setLoading, setPassword} from "../auth_slice.js";
import {AuthRepository} from "../auth_repository.js";

export const LoginForm = () => {
    const { email, password, error, loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true))
        const authRepo = new AuthRepository();
        const result = await authRepo.getLogin(email, password);
        console.log(result)
        dispatch(setLoading(false))
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <Label
                                htmlFor="email1"
                                value="Your email"
                            />
                            <TextInput
                                id="email1"
                                placeholder="name@rupp.edu.kh"
                                required
                                value={email}
                                onChange={(e) => dispatch(setEmail(e.target.value))}
                                color={error ? "failure" : "gray"}
                                helperText={error && <><span className="font-medium">Oops!</span>{error}</>}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="password"
                                value="Your password"
                            />
                            <TextInput
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => dispatch(setPassword(e.target.value))}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <Checkbox id="remember"/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <Label htmlFor="remember">
                                        Remember me
                                    </Label>
                                </div>
                            </div>
                            <Link to={PagesRoute.forget} className="dark:text-primary-500 text-primary-600"> Forgot password? </Link>
                        </div>
                        <motion.div
                            className="relative"
                            whileHover={{
                                scale: 1.025,
                                transition: {duration: 0.3}
                            }}
                            whileTap={{scale: 0.95}}
                        >
                            <Button
                                type="submit"
                                className="w-full justify-center"
                                size="md"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? <Spinner color="success" /> : <p> Submit </p>}
                            </Button>
                        </motion.div>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet?{" "}
                            <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Request Now
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
