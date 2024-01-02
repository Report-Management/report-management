import React, { Component } from 'react'

export class ChangePass extends Component {
    render() {
        return (
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
                <div className="w-full bg-white opacity-95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 lg:w-[700px] sm:w-[500px]">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Reset your password
                        </h1>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                            <div className="space-y-2">
                                <label htmlFor="email">Enter new password </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="newpassword"
                                    className="input w-full bg-gray-100 dark:bg-gray-700"
                                    placeholder="********"
                                    onChange={this.handleNewPass}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email">Confirm new password </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="confirmpassword"
                                    className="input w-full bg-gray-100 dark:bg-gray-700"
                                    placeholder="********"
                                    onChange={this.handleConfirmPass}
                                />
                            </div>
                            <button type="submit" className="w-full btn bg-blue-500 text-white hover:bg-blue-600">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
