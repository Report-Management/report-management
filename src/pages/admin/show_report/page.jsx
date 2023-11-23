import {postCardData} from "./constant.js";
import {AdminPostCard} from "../../../components/index.jsx";
import Masonry from "react-masonry-css";

export const AdminShowReportView = () => {
    const breakpointColumnsObj = {
        default: 3,
        1024: 3,
        768: 1,
        640: 1,
    };
    return (
        <>
            <div className="p-3">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto"
                    columnClassName="px-2">
                    {postCardData.map((item, index) => (
                        <div key={index} className="w-full mb-6">
                            <AdminPostCard {...item} />
                        </div>
                    ))}
                </Masonry>
            </div>
        </>
    );
}