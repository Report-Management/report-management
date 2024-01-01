import 'react-photo-view/dist/react-photo-view.css';
import {PhotoProvider, PhotoView} from "react-photo-view";


export const FileDisplay = ({ fileUrl }) => {
    const checkSupabaseURLType = (url) => {
        const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
        const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm'];

        const lowerCaseURL = url.toLowerCase();

        const isImage = imageExtensions.some(ext => lowerCaseURL.includes(`.${ext}`));
        const isVideo = videoExtensions.some(ext => lowerCaseURL.includes(`.${ext}`));

        if (isImage) {
            return 'image';
        } else if (isVideo) {
            return 'video';
        } else {
            return 'unknown';
        }
    };

    const renderFile = () => {
        if (!fileUrl) {
            return null;
        }

        const fileType = checkSupabaseURLType(fileUrl);

        if (fileType === 'image') {
            return <div className="rounded-lg">
                <PhotoProvider>
                    <PhotoView src={fileUrl}>
                        <img
                            src={fileUrl}
                            alt="Post image"
                            className="w-full object-cover"
                            style={{height: '500px'}}
                        />
                    </PhotoView>
                </PhotoProvider>
            </div>;
        } else if (fileType === 'video') {
            return (
                <div className="rounded-lg w-full">
                    <video controls className="rounded-lg w-full" style={{height: '400px'}}>
                        <source src={fileUrl} type="video/mp4"/>
                        Your browser does not support the video tag or the video format.
                    </video>
                </div>

            );
        } else {
            return null;
        }
    };

    return <div>{renderFile()}</div>;
};
