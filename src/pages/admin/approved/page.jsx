import {AdminApprovedReport, Loading} from "../../../components/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeReport, setListReport, setLoading, setLoadingIndex, setLoadingSummaried, setSummaryIndex} from "./slice.js";
import {useEffect, useState} from "react";
import {ApprovedReportRepository} from "./repository.js";

export const AdminApprovedView = () => {
    const {loading, listReports} = useSelector((state) => state.approved_report);
    const [completedNumber, setCompletedNumber] = useState(0)
    const [approvedNumber, setApprovedNumber] = useState(0)
    const dispatch = useDispatch()
    const repository = new ApprovedReportRepository()

    async function getReports() {
        dispatch(setLoading(true));
        const result = await repository.getReportApproved()
        if (result != null) {
            console.log(result)
            dispatch(setListReport(result))
            setCompletedNumber(result.filter(item => item.completed === false).length)
            setApprovedNumber(result.filter(item => item.approval === true).length)
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        console.log(listReports)
    }



    async function onCompleted(index) {
        dispatch(setLoadingIndex({isLoading: true, index}))
        const result = await repository.updateCompleted(listReports[index].id)
        if (result != null) {
            dispatch(setLoadingIndex({isLoading: false, index}))
            setCompletedNumber(completedNumber - 1)
            setApprovedNumber(approvedNumber - 1)
            dispatch(removeReport(index))
        }
        dispatch(setLoadingIndex({isLoading: false, index}))
    }

    async function onApproved(index) {
        dispatch(setLoadingIndex({isLoading: true, index}))
        const result = await repository.updateUnapproved(listReports[index].id)
        if (result != null) {
            dispatch(setLoadingIndex({isLoading: false, index}))
            setCompletedNumber(completedNumber - 1)
            setApprovedNumber(approvedNumber - 1)
            dispatch(removeReport(index))
        }
        dispatch(setLoadingIndex({isLoading: false, index}))
    }

    async function getSummary(index) {
        dispatch(setLoadingSummaried({isSummaried: true, index}));
        const result = await repository.onGetSummary(listReports[index].id);
        if (result) {
            dispatch(setSummaryIndex({data: result, index}));
            dispatch(setLoadingSummaried({isSummaried: false, index}));
        }
        dispatch(setLoadingSummaried({isSummaried: false, index}));
    }

    useEffect(() => {
        getReports()
    }, []);

    if (loading) return (
        <Loading/>
    )
    return (
        <>
            <div className="space-x-3 fixed right-0 px-6">
                <button className="btn bg-green-400 text-white dark:text-black hover:bg-green-200 font-rubik">
                    Approved
                    <div className="badge"> { approvedNumber }</div>
                </button>
                <button className="btn btn-warning font-rubik text-white dark:text-black">
                    Incomplete
                    <div className="badge"> { completedNumber } </div>
                </button>
            </div>
            <div className="flex flex-row justify-center items-center">
                <div className="p-3 container mx-auto max-h-screen h-full w-full">
                    {
                        listReports.length === 0 ?
                            <div className="container mx-auto h-full flex justify-center items-center"> No
                                Record</div> :
                            <div className="flex flex-row justify-center items-center">
                                <div className="max-w-2xl max-auto w-full">
                                    {listReports.map((item, index) => (
                                        <div key={item.id} className="w-full mb-6">
                                            <AdminApprovedReport
                                                key={item.id}
                                                {...item}
                                                onApproved={() => onApproved(index)}
                                                onCompleted={() => onCompleted(index)}
                                                onSummary={() => getSummary(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}