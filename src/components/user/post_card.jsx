import {Avatar, Badge, Card} from "flowbite-react";
import PropTypes from 'prop-types';
import {FileDisplay} from "../admin/filedisplay.jsx";

export const PostCard = (props) => {
    return (
        <div className="h-auto w-full">
            <div>
                <Card className="w-[100%]">
                    <div>
                        <div className="flex flex-row justify-between">
                            <div className="flex justify-start items-center space-x-3">
                                {props.profile ? <Avatar alt="User settings object-cover" img={props.profile} rounded/> :
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
                            <div className="text-white rounded-lg text-sm md:text-md font-semibold flex">
                                {
                                    props.approved === true ?
                                    <button
                                        className="btn btn-xs btn-success text-white"
                                        >Approved
                                    </button> :
                                    <button
                                        className="btn btn-xs text-white bg-red-500"
                                        > Pending
                                    </button>
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
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*{*/}
                    {/*    props.file ? <p className="link" onClick={props.onClick}>*/}
                    {/*        {*/}
                    {/*            props.file.endsWith(".mp4") ? "video.mp4" : "photo.png"*/}
                    {/*        }*/}
                    {/*    </p> : null*/}
                    {/*}*/}
                    {props.file ? <FileDisplay fileUrl={props.file} /> : null}
                </Card>
            </div>
        </div>
    );
}

PostCard.propTypes = {
    username: PropTypes.string,
    time: PropTypes.string,
    header: PropTypes.string,
    information: PropTypes.string,
    category: PropTypes.string,
    priority: PropTypes.string,
    approved: PropTypes.bool,
    profile: PropTypes.string,
    file: PropTypes.string,
    onClick: PropTypes.func,
};

PostCard.defaultProps = {
    username: "Username",
    time: "Just Now",
    header: "Title",
    information: "Content",
    approved: false,
    profile: "https://cdn-icons-png.flaticon.com/512/9131/9131478.png",
}