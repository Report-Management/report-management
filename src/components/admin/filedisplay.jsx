
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
            return <div className="rounded-lg overflow-hidden">
                <img
                    src={fileUrl}
                    alt="Post image"
                    className="w-full h-auto transform ease-in-out duration-500 hover:scale-110"
                    style={{ transitionDuration: '0.5s' }}
                />
            </div>;
        } else if (fileType === 'video') {
            return (
                <div className="max-w-full rounded-lg">
                    <video controls width="500" className="rounded-lg">
                        <source src={fileUrl} type="video/mp4" />
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
