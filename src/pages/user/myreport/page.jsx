import {Loading} from "../../../components/index.jsx";
import {useEffect, useState} from "react";
import { MyReportRepository } from "./repository.js";
import {FileDisplay} from "../../../components/admin/filedisplay.jsx";
import {MyReportPostCard} from "../../../components/user/myreport.jsx";

export const MyReportView = () => {
    const [listReport, setListReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const reportRepository = new MyReportRepository();

    async function fetchReport () {
        setLoading(true);
        const result = await reportRepository.getMyReport()
        if (result !== null) {
            setListReport(result);
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchReport();
    }, []);

    if (loading) {
        return <div className="max-h-screen overflow-hidden h-full">
            <Loading />
        </div>
    }

    return (
        <>
            <div className="container space-y-2 max-h-screen flex flex-col p-3 items-center min-w-lg">
                {listReport.map((data, index) => (
                    <div key={index} className="w-full max-w-[60%] min-w-lg">
                        <div >
                            <MyReportPostCard
                                key={index}
                                username={data.username}
                                time={data.time}
                                header={data.header}
                                information={data.information}
                                approved={data.approved}
                                profile={data.profilePhoto}
                                file={data.file}
                                category={data.category}
                                priority={data.priority}
                                onClick={() => document.getElementById(index.toString()).showModal()}
                            />
                        </div>
                        <dialog key={index} id={index.toString()} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <div className="p-3">
                                    {data.file ? <FileDisplay fileUrl={data.file} /> : null}
                                </div>
                            </div>
                        </dialog>
                    </div>
                ))}
            </div>
        </>
    );
}
