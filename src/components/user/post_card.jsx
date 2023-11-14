import {Avatar, Button, Card} from "flowbite-react";
import PropTypes from 'prop-types';
import {motion} from "framer-motion";

export const PostCard = ({ username, timestamp, title, content, status, avatarUrl, imageUrl }) => {
    return (
        <Card className="max-w-max min-w-md">
            <div className="flex justify-start items-center space-x-3">
                { avatarUrl ? <Avatar alt="User settings" img={avatarUrl} rounded/> : <Avatar alt="User settings" img="https://cdn-icons-png.flaticon.com/512/9131/9131478.png" rounded/> }
                <div className="flex flex-col justify-center items-start">
                    <div className="text-center font-medium text-lg dark:text-white">
                        { username }
                    </div>
                    <div className="text-center font-light text-sm dark:text-gray-400">
                        { timestamp }
                    </div>
                    <hrs/>
                </div>
            </div>
            <div className="max-w-6xl">
                <div className="text-start text-md font-bold dark:text-white">
                    { title }
                </div>
                <div className="text-start text-md font-normal dark:text-white">
                    { content }
                </div>
            </div>
            { imageUrl ? <img src={imageUrl} alt="Post image" className="w-full h-auto rounded-lg"/> : null }
            <div className="flex flex-row justify-end items-center">
                <Button className="mr-3 bg-green-600" size="sm">
                    <span className="font-bold"> { status }</span>
                </Button>
            </div>
        </Card>
    );
}

PostCard.propTypes = {
    username: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    imageUrl: PropTypes.string,
};