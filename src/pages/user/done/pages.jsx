
import {DonePostCard} from "../../../components/user/done_report.jsx";
import {useEffect, useState} from "react";
import {Loading} from "../../../components/index.jsx";
import {DoneReportRepository} from "./repository.js";
import {FileDisplay} from "../../../components/admin/filedisplay.jsx";

export const DoneView = () => {
    const [listReport, setListReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const reportRepository = new DoneReportRepository();

    async function fetchReport() {
        setLoading(true);
        const result = await reportRepository.getApprovedReport()
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
            <Loading/>
        </div>
    }

    return (
        <>
            <div className="container space-y-2 max-h-screen flex flex-col p-3 items-center min-w-lg">
                {listReport.map((data, index) => (
                    <div key={index} className="w-full md:max-w-[60%] min-w-lg">
                        <div>
                            <DonePostCard
                                key={index}
                                username={data.username}
                                time={data.time}
                                header={data.header}
                                information={data.information}
                                completed={data.completed}
                                profile={data.profile}
                                file={data.file}
                                category={data.category}
                                priority={data.priority}
                                onClick={() => document.getElementById(index.toString()).showModal()}
                            />
                        </div>
                        <dialog key={index} id={index.toString()} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                                    </button>
                                </form>
                                <div className="p-3">
                                    {data.file ? <FileDisplay fileUrl={data.file}/> : null}
                                </div>
                            </div>
                        </dialog>
                    </div>
                ))}
            </div>
        </>
    );
}