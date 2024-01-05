import {Loading} from "../../../components/index.jsx";
import {useEffect, useState} from "react";
import { MyReportRepository } from "./repository.js";
import {MyReportPostCard} from "../../../components/user/myreport.jsx";

export const MyReportView = () => {
    const [listReport, setListReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const reportRepository = new MyReportRepository();
    const [id, setID] = useState(null);

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

    async function onDeleteReport() {
        const result = await reportRepository.deletedReport(id);
        if (result){
            fetchReport();
        }
    }

    async function onDeleteReportFile(id) {
        const result = await reportRepository.removeReportFile(id);
        if (result){
            fetchReport();
        }
    }

    if (loading) {
        return <div className="max-h-screen overflow-hidden h-full">
            <Loading />
        </div>
    }
    if (listReport.length === 0) {
        return (
            <div className="max-h-screen overflow-hidden h-full">
                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-2xl font-bold font-rubik">No Report</h1>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container space-y-2 max-h-screen flex flex-col p-3 items-center min-w-lg">
                {listReport.map((data, index) => (
                    <div key={data.id} className="w-full maxs-w-[60%] min-w-lg">
                        <div>
                            <MyReportPostCard
                                key={data.id}
                                id={data.id}
                                username={data.username}
                                time={data.time}
                                header={data.header}
                                information={data.information}
                                approved={data.approved}
                                profile={data.profile}
                                file={data.file}
                                view={data.view}
                                category={data.category}
                                priority={data.priority}
                                onClick={() => document.getElementById(index.toString()).showModal()}
                                onDelete={() => {
                                    document.getElementById("model_deleted").showModal()
                                    setID(data.id)
                                }}
                                remove={() => {
                                    onDeleteReportFile(data.id)
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <dialog id={"model_deleted"} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-md font-rubik ">Are you to deleted this report ?</h3>
                    <div className="modal-action">
                        <button className="btn btn-warning" onClick={onDeleteReport}>Confirm</button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
