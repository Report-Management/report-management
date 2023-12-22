import {Avatar, Badge, Card} from "flowbite-react";
import PropTypes from 'prop-types';
import {motion} from "framer-motion";
import {FileDisplay} from "./filedisplay.jsx";

export const AdminSpamReport = (props) => {
    return (<div className="h-auto max-w-full">
        <motion.div
            whileHover={{scale: 1.025}}
            transition={{duration: 0.3}}
        >
            <Card>
                <div>
                    <div className="flex flex-row justify-between">
                        <div className="flex justify-start items-center space-x-3">
                            {props.profile ? <Avatar alt="User settings object-cover" img={props.profile} rounded/> : <Avatar
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
                        <div className="text-white rounded-lg text-sm md:text-md font-semibold flex">
                            {
                                props.isLoading ? <span className="loading loading-spinner text-primary"></span> : props.spam !== true ? <div className="tooltip" data-tip="Click to disapproved"><button className="btn btn-xs btn-success text-white" onClick={props.onHam}>Ham</button></div> : <div className="tooltip" data-tip="Click to Approve"><button className="btn btn-xs text-white bg-warning" onClick={props.onHam}>Spam</button></div>
                            }
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl">
                    <div className="flex flex-row space-x-2 pb-2">
                        <div className="text-black text-centerrounded-lgfont-medium font-sans text-sm md:text-md">
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
                                <span>{props.information}
                                    {props.information.length > 50 ? <span className="link text-blue-500 pl-2" onClick={() => {
                                    }}>summary</span> : null}
                                </span>
                        </div>

                    </div>
                </div>
                {props.file ? <FileDisplay fileUrl={props.file} /> : null}
            </Card>
        </motion.div>
    </div>);
}

AdminSpamReport.propTypes = {
    id: PropTypes.string,
    category: PropTypes.string,
    priority: PropTypes.string,
    header: PropTypes.string,
    information: PropTypes.string,
    spam: PropTypes.bool,
    view: PropTypes.string,
    file: PropTypes.string,
    time: PropTypes.string,
    username: PropTypes.string,
    profile: PropTypes.string,
    onHam: PropTypes.func,
    isLoading: PropTypes.bool,
};

AdminSpamReport.defaultProps = {
    username: "Username",
    timestamp: "Just Now",
    title: "Title",
    content: "Content",
    status: true,
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131478.png",
    isLoading: false,
}