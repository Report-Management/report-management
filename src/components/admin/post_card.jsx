import {Avatar, Button, Card} from "flowbite-react";
import PropTypes from 'prop-types';

export const AdminPostCard = (props) => {
    return (
        <Card className="max-w-max min-w-lg">
            <div className="flex justify-start items-center space-x-3">
                { props.avatarUrl ? <Avatar alt="User settings" img={props.avatarUrl} rounded/> : <Avatar alt="User settings" img="https://cdn-icons-png.flaticon.com/512/9131/9131478.png" rounded/> }
                <div className="flex flex-col justify-center items-start">
                    <div className="text-center font-medium text-lg dark:text-white">
                        { props.username }
                    </div>
                    <div className="text-center font-light text-sm dark:text-gray-400">
                        { props.timestamp }
                    </div>
                    <hrs/>
                </div>
            </div>
            <div className="max-w-6xl">
                <div className="text-start text-md font-bold dark:text-white">
                    { props.title }
                </div>
                <div className="text-start text-md font-normal dark:text-white">
                    { props.content }
                </div>
            </div>
            { props.imageUrl ? <img src={props.imageUrl} alt="Post image" className="w-full h-auto rounded-lg"/> : null }
            <div className="flex flex-row justify-end items-center">
                <Button className="mr-3 bg-green-600" size="sm">
                    <span className="font-bold"> { props.status }</span>
                </Button>
            </div>
        </Card>
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