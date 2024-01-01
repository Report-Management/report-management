import {Avatar, Badge, Card} from "flowbite-react";
import PropTypes from 'prop-types';
import {motion} from "framer-motion";
import {FileDisplay} from "./filedisplay.jsx";
import {ThreeDots} from "react-loader-spinner";
import {TypeAnimation} from "react-type-animation";
import {ApprovedButton, CompletedButton, SmallCompletedButton} from "./mybutton.jsx";

export const AdminApprovedReport = (props) => {
    const modalId = `my_modal_${props.id}`;
    return (
        <>
            <div className="h-auto max-w-full">
                <motion.div
                    whileHover={{scale: 1.025}}
                    transition={{duration: 0.3}}
                >
                    <Card>
                        <div>
                            <div className="flex flex-row justify-between">
                                <div className="flex-1 w-full">
                                    <div className="flex justify-start items-center space-x-3" onClick={() => document.getElementById(modalId).showModal()}>
                                        {props.profile ?
                                            <Avatar alt="User settings object-cover" img={props.profile} rounded/> :
                                            <Avatar
                                                alt="User settings"
                                                size="xs"
                                                img="https://cdn-icons-png.flaticon.com/512/9131/9131478.png" rounded/>}
                                        <div className="flex flex-col justify-center items-start">
                                            <div className="text-center font-medium text-sm md:text-md dark:text-white">
                                                {props.view === "Public" ? props.username ?? "Anonymous" : "Anonymous"}
                                            </div>
                                            <div className="text-center font-light text-xs dark:text-gray-400">
                                                {props.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {
                                        props.isLoading ? <span
                                                className="loading loading-spinner text-primary rounded-none"></span> :
                                            <SmallCompletedButton completed={props.completed} onCompleted={props.onCompleted}/>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="max-w-6xl" onClick={() => document.getElementById(modalId).showModal()}>
                            <div className="flex flex-row space-x-2 pb-2 cursor-pointer">
                                <div
                                    className="text-black text-centerrounded-lgfont-medium font-sans text-sm md:text-md">
                                    <Badge color="gray"> {props.category} </Badge>
                                </div>
                                <div
                                    className="bg-gray-100 dark:bg-whit text-black text-center rounded-lg font-medium font-sans text-sm md:text-md">
                                    <Badge color="gray"> {props.priority} </Badge>
                                </div>
                            </div>
                            <div className="text-start text-sm md:text-md font-bold dark:text-white">
                                {props.header}
                            </div>
                            <div className="text-start text-sm md:text-md font-normal dark:text-white">
                                <div className="text-start text-sm md:text-md font-normal dark:text-white">
                                    <span>{props.information} </span>
                                </div>

                            </div>
                        </div>
                        {props.file ? <FileDisplay fileUrl={props.file}/> : null}
                    </Card>
                </motion.div>
            </div>
            <dialog key={props.id} id={modalId} className="modal">
                <div className="modal-box max-w-[50%] w-full" style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(156, 163, 175, var(--tw-bg-opacity)) rgba(255, 255, 255, var(--tw-bg-opacity))'
                }}>
                    {/* Profile */}
                    <div className="flex flex-row justify-between">
                        <div className="flex justify-start items-center space-x-3">
                            {props.profile ?
                                <Avatar alt="User settings object-cover" img={props.profile} rounded/> :
                                <Avatar
                                    alt="User settings"
                                    size="xs"
                                    img="https://cdn-icons-png.flaticon.com/512/9131/9131478.png" rounded/>}
                            <div className="flex flex-col justify-center items-start">
                                <div className="text-center font-medium text-sm md:text-md dark:text-white">
                                    {props.view === "Public" ? props.username ?? "Anonymous" : "Anonymous"}
                                </div>
                                <div className="text-center font-light text-xs dark:text-gray-400">
                                    {props.time}
                                </div>
                            </div>
                        </div>
                        {/* Status */}
                        <div className="text-white rounded-lg text-sm md:text-md font-semibold">
                            <div>
                                {
                                    props.isLoading ? <span className="loading loading-spinner text-primary"></span> :
                                        <div className="flex flex-row justify-end items-center space-x-2 ">
                                            <ApprovedButton key={props.id} approval={props.approval} onApproved={props.onApproved}/>
                                            <CompletedButton key={props.id} completed={props.completed} onCompleted={props.onCompleted}/>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="pt-3">
                        <div className="max-w-6xl">
                            <div className="flex flex-row space-x-2 pb-2">
                                <div
                                    className="text-black text-centerrounded-lgfont-medium font-sans text-sm md:text-md">
                                    <Badge color="gray"> {props.category} </Badge>
                                </div>
                                <div
                                    className="bg-gray-100 dark:bg-whit text-black text-center rounded-lg font-medium font-sans text-sm md:text-md">
                                    <Badge color="gray"> {props.priority} </Badge>
                                </div>
                            </div>
                            {/* Header */}
                            <div className="text-start text-md md:text-lg font-bold dark:text-white">
                                {props.header}
                            </div>
                            {/* Information */}
                            <div className="text-start text-md md:text-lg font-normal dark:text-white pb-3">
                                <div className="text-start text-sm md:text-md font-normal dark:text-white">
                                    <span>
                                        {
                                            props.information ?? null
                                        }
                                    </span>
                                </div>
                                <div className="pt-3 space-x-3">
                                    {
                                        props.information.length > 150 ? props.summaryText == null ?
                                            <button
                                                type={"button"}
                                                onClick={props.onSummary}
                                                className="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500">
                                                Gemini AI
                                                {
                                                    props.isSummaried === true ? <div>
                                                        <ThreeDots height="10" width="26" radius="6" color="#ffffff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
                                                    </div> : <div>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            version="1.1"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            x={0}
                                                            y={0}
                                                            viewBox="0 0 100 100"
                                                            style={{enableBackground: "new 0 0 512 512"}}
                                                            xmlSpace="preserve"
                                                            className="h-6 w-6"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M90.03 48.41c-9.05-.03-18.55-1.88-25.7-7.78-6.01-4.96-9.58-12-11.31-19.5-1.08-4.68-1.47-9.47-1.44-14.26 0-1-.8-1.44-1.58-1.44s-1.58.44-1.58 1.44c.04 8.17-1.11 16.62-4.92 23.96-3.63 6.99-9.61 12.28-17.02 14.97-5.29 1.92-10.91 2.6-16.51 2.62-1 0-1.44.81-1.44 1.59s.44 1.59 1.44 1.59c9.05.03 18.55 1.88 25.7 7.78 6.01 4.96 9.58 12 11.31 19.5 1.08 4.68 1.46 9.47 1.44 14.26 0 1 .8 1.44 1.58 1.44s1.58-.44 1.58-1.44c-.04-8.17 1.11-16.62 4.92-23.96 3.63-6.99 9.61-12.28 17.02-14.97 5.29-1.92 10.91-2.6 16.51-2.62 1 0 1.44-.81 1.44-1.59s-.44-1.59-1.44-1.59zm-27.51 8.58c-6.51 5.23-10.48 12.91-12.36 20.94-.06.24-.1.49-.16.73-.85-3.86-2.13-7.61-3.97-11.12-3.98-7.6-10.58-13.22-18.61-16.17-1.52-.56-3.08-1.01-4.66-1.38 5.31-1.27 10.35-3.48 14.71-6.98 6.51-5.23 10.48-12.91 12.36-20.94.06-.24.1-.49.16-.73.85 3.86 2.13 7.61 3.97 11.12 3.98 7.6 10.58 13.22 18.61 16.17 1.52.56 3.08 1.01 4.66 1.38-5.31 1.28-10.35 3.48-14.71 6.98z"
                                                                    fill="#FFFFFF"
                                                                    opacity={1}
                                                                    data-original="#000000"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                }
                                            </button> : null : null
                                    }
                                </div>
                                <div>
                                    {
                                        props.summaryText != null ?
                                            <div className="w-full bg-gray-100 dark:bg-gray-700 text-black p-3 rounded-lg">
                                                <div
                                                    className="text-sm md:text-md uppercase font-semibold font-rubik bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500 ">
                                                    Gemini
                                                    AI
                                                </div>
                                                <TypeAnimation
                                                    key={modalId}
                                                    sequence={[
                                                        props.summaryText,
                                                        1000,
                                                    ]}
                                                    wrapper="span"
                                                    style={{display: 'inline-block'}}
                                                    cursor={false}
                                                    speed={80}
                                                    className={"text-sm md:text-md dark:text-white"}
                                                    repeat={1}
                                                />
                                            </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                        {props.file ? (
                            <div className="bg-black">
                                <FileDisplay fileUrl={props.file}/>
                            </div>
                        ) : null}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

AdminApprovedReport.propTypes = {
    id: PropTypes.string,
    category: PropTypes.string,
    priority: PropTypes.string,
    header: PropTypes.string,
    information: PropTypes.string,
    approval: PropTypes.bool,
    completed: PropTypes.bool,
    view: PropTypes.string,
    file: PropTypes.string,
    time: PropTypes.string,
    username: PropTypes.string,
    profile: PropTypes.string,
    onApproved: PropTypes.func,
    onCompleted: PropTypes.func,
    isLoading: PropTypes.bool,
    onSummary: PropTypes.func,
    isSummaried: PropTypes.bool,
    summaryText: PropTypes.string,
};

AdminApprovedReport.defaultProps = {
    username: "Username",
    timestamp: "Just Now",
    title: "Title",
    content: "Content",
    status: true,
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131478.png",
    isLoading: false,
}