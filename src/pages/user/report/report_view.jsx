import {Loading, PostCard} from "../../../components/index.jsx";
import {useEffect, useState} from "react";
import {UserReportRepository} from "./repository.js";
import {FileDisplay} from "../../../components/admin/filedisplay.jsx";
import {FaSearch, FaTimes} from "react-icons/fa";

export const ReportView = () => {
    const [listReport, setListReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const reportRepository = new UserReportRepository();
    const [searchTerm, setSearchTerm] = useState('');
    const [originalList, setOriginalList] = useState([]);

    useEffect(() => {
        fetchReport();
    }, []);

    async function fetchReport() {
        console.log("getReports")
        setLoading(true);
        const result = await reportRepository.getApprovedReport()
        if (result !== null) {
            setListReport(result);
            setOriginalList(result);
            setLoading(false);
        }
        setLoading(false);
    }

    function filterObjects(list, searchTerm) {
        return list.filter((obj) =>
            Object.values(obj).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }

    const clearSearch = () => {
        setSearchTerm('');
        setListReport(originalList);
    };

    function onSearch(e) {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setListReport(originalList);
        } else {
            setListReport(filterObjects(originalList, term));
        }
    }

    if (loading) {
        return <div className="max-h-screen overflow-hidden h-full">
            <Loading/>
        </div>
    }

    return (
        <>
            <div className="sticky top-0 z-50 outline-none bg-gray-50 dark:bg-gray-800">
                <div className="p-3">
                    <div className="relative" >
                        <input
                            type="text"
                            placeholder="Search..."
                            className="input w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                            value={searchTerm}
                            onChange={onSearch}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaSearch/>
                        </div>
                        {searchTerm && (
                            <button
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                onClick={clearSearch}
                            >
                                <FaTimes/>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="container space-y-2 max-h-screen flex flex-col p-3 items-center min-w-lg">
                {listReport.map((data, index) => (
                    <div key={index} className="w-full md:max-w-[60%] min-w-lg">
                        <div>
                            <PostCard
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
