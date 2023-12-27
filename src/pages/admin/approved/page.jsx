import Masonry from "react-masonry-css";
import {AdminApprovedReport, Loading} from "../../../components/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeReport, setListReport, setLoading, setLoadingIndex} from "./slice.js";
import {useEffect, useState} from "react";
import {ApprovedReportRepository} from "./repository.js";

export const AdminApprovedView = () => {
    const { loading, listReports } = useSelector((state) => state.approved_report);
    const [listReport, setListReports] = useState(listReports)
    const dispatch = useDispatch()
    const repository = new ApprovedReportRepository()
    const breakpointColumnsObj = {
        default: 3,
        1024: 3,
        768: 1,
        640: 1,
    };

    function isLoadingID(id, loadingValue) {
        setListReports(prevFilter =>
            prevFilter.map(item =>
                item.id === id ? {...item, isLoading: loadingValue} : item
            )
        )
    }

    function remove_by_id(id) {
        setListReports(prevFilter => prevFilter.filter(item => item.id !== id));
    }

    async function getReports() {
        dispatch(setLoading(true));
        const result = await repository.getReportApproved()
        if (result != null) {
            dispatch(setListReport(result))
            setListReports(result)
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        console.log(listReports)
    }


    async function onCompleted(id) {
        isLoadingID(id, true)
        const result = await repository.updateCompleted(id)
        if (result != null) {
            isLoadingID(id, false)
            remove_by_id(id)
        }
        isLoadingID(id, false)
    }

    async function onApproved(id) {
        isLoadingID(id, true)
        const result = await repository.updateUnapproved(id)
        if (result != null) {
            isLoadingID(id, false)
            remove_by_id(id)
        }
        isLoadingID(id, false)
    }

    useEffect(() => {
        getReports()
    }, []);

    if (loading) return (
        <Loading/>
    )
    return (
        <div className="p-3 container mx-auto max-h-screen h-full">
            {
                listReport.length === 0 ?
                    <div className="container mx-auto h-full flex justify-center items-center"> No Record</div> : <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-auto"
                        columnClassName="px-2">
                        {listReport.map((item, index) => (
                            <div key={index} className="w-full mb-6">
                                <AdminApprovedReport
                                    {...item}
                                    onApproved={() => onApproved(item.id)}
                                    onCompleted={() => onCompleted(item.id)}/>
                            </div>
                        ))}
                    </Masonry>
            }
        </div>
    );
}