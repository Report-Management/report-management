import {PostCard} from "../../../components/user/index.jsx";
import {motion} from "framer-motion";

export const ReportView = () => {
    const postCardData = [
        {
            username: "John Doe",
            timestamp: "1 minute ago",
            title: "Lorem ipsum 1",
            content: "Lorem ipsum dolor sit amet 1, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua 1.",
            status: "APPROVED",
        },
        {
            username: "Jane Smith",
            timestamp: "1 hour ago",
            title: "Just Now",
            content: "Lorem ipsum dolor sit amet 2, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua 2.",
            status: "APPROVED",
            image: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
        },
        {
            username: "Jane Smith",
            timestamp: "1 hour ago",
            title: "Just Now",
            content: "Lorem ipsum dolor sit amet 2, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua 2.",
            status: "APPROVED",
            image: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
        },
        {
            username: "Jane Smith",
            timestamp: "1 hour ago",
            title: "Just Now",
            content: "Lorem ipsum dolor sit amet 2, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua 2.",
            status: "APPROVED",
            image: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
        },
        {
            username: "Jane Smith",
            timestamp: "1 hour ago",
            title: "Just Now",
            content: "Lorem ipsum dolor sit amet 2, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua 2.",
            status: "APPROVED",
            image: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
        }, {
            username: "Jane Smith",
            timestamp: "1 hour ago",
            title: "Just Now",
            content: "Lorem ipsum dolor sit amet 2, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua 2.",
            status: "APPROVED",
            image: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
        },
        {
            username: "Jane Smith",
            timestamp: "1 hour ago",
            title: "Just Now",
            content: "Lorem ipsum dolor sit amet 2, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua 2.",
            status: "APPROVED",
            image: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
        },


    ];

    return (
        <div className="container flex flex-col justify-start items-center space-y-5 h-screen">
            {postCardData.map((data, index) => (
                <motion.div
                    key={index}
                    className="max-w-[90%] lg:max-w-[80%] min-w-lg"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        duration: 0.5,
                    }}
                >
                    <PostCard
                        key={index}
                        username={data.username}
                        timestamp={data.timestamp}
                        title={data.title}
                        content={data.content}
                        status={data.status}
                        imageUrl={data.image}
                    />
                </motion.div>
            ))}
        </div>
    );
}
