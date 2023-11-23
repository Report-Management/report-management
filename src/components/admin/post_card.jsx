import {Avatar, Card} from "flowbite-react";
import PropTypes from 'prop-types';

export const AdminPostCard = (props) => {
    return (
        <div className="h-auto max-w-full">
            <Card>
                <div className="flex flex-row justify-between">
                    <div className="flex justify-start items-center space-x-3">
                        { props.avatarUrl ? <Avatar alt="User settings" img={props.avatarUrl} rounded/> : <Avatar alt="User settings" img="https://cdn-icons-png.flaticon.com/512/9131/9131478.png" rounded/> }
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-center font-medium text-md md:text-lg dark:text-white">
                                { props.username }
                            </div>
                            <div className="text-center font-light text-sm dark:text-gray-400">
                                { props.timestamp }
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-green-600 text-white p-1.5 rounded-lg px-5 text-sm md:text-md font-semibold">
                            { props.status }
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl">
                    <div className="flex flex-row space-x-2 pb-2" >
                        <div className="bg-gray-100 dark:bg-white text-black text-center p-1.5 rounded-lg px-3 font-medium font-sans text-sm md:text-md">FacultyEnv</div>
                        <div className="bg-gray-100 dark:bg-whit text-black text-center p-1.5 rounded-lg px-3 font-medium font-sans text-sm md:text-md">High</div>
                    </div>
                    <div className="text-start text-sm md:text-md font-bold dark:text-white">
                        { props.title }
                    </div>
                    <div className="text-start text-sm md:text-md font-normal dark:text-white">
                        { props.content }
                    </div>
                </div>
                { props.imageUrl ? <img src={props.imageUrl} alt="Post image" className="w-full h-auto rounded-lg"/> : null }
                <div className="md:hidden">
                    <div className="bg-green-600 text-white p-1.5 rounded-lg px-5 text-md md:text-lg text-center  font-semibold">
                        { props.status }
                    </div>
                </div>
            </Card>
        </div>
    );
}

AdminPostCard.propTypes = {
    username: PropTypes.string,
    timestamp: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.string,
    avatarUrl: PropTypes.string,
    imageUrl: PropTypes.string,
};

AdminPostCard.defaultProps = {
    username: "Username",
    timestamp: "Just Now",
    title: "Title",
    content: "Content",
    status: "APPROVED",
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131478.png",
}