import {postCardData} from "./constant.js";
import {AdminPostCard} from "../../../components/admin/post_card.jsx";
import {Button} from "flowbite-react";


export const AdminShowReportView = () => {
    return (
        <>
            <div className="grid-container space-y-5 h-screen">
                <div className="grid grid-cols-3 gap-4 p-6">
                    {postCardData.map((item, index) => (
                        <div key={index} className="relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
                            <AdminPostCard key={index} {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}