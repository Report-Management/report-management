import {AdminDoneReport, Loading} from "../../../components/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setListReport, setLoadingIndex, removeReport, setSummaryIndex, setLoadingSummaried} from "./slice.js";
import {DoneReportRepository} from "./repository.js";
import {useEffect, useState} from "react";

export const AdminDoneView = () => {
    const { loading, listReports } = useSelector((state) => state.done_report);
    const [completedNumber, setCompletedNumber] = useState(0)
    const dispatch = useDispatch()
    const repository = new DoneReportRepository()
    async function getReports() {
        dispatch(setLoading(true));
        const result = await repository.getReportCompleted()
        if (result != null) {
            console.log(result)
            dispatch(setListReport(result))
            setCompletedNumber(result.filter(item => item.completed === true).length)
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        console.log(listReports)
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

    async function onCompleted(index) {
        dispatch(setLoadingIndex({isLoading: true, index}))
        const result = await repository.updateUncompleted(listReports[index].id)
        if (result != null) {
            dispatch(setLoadingIndex({isLoading: false, index}))
            setCompletedNumber(completedNumber - 1)
            dispatch(removeReport(index))
        }
        dispatch(setLoadingIndex({isLoading: false, index}))
    }

    useEffect(() => {
        getReports()
    }, []);

    if (loading) return (
        <Loading/>
    )
    return (
        <>
            <div className="space-x-3 fixed right-0 px-8">
                <button className="btn bg-green-400 text-white dark:text-black hover:bg-green-200 font-rubik">
                    Completed
                    <div className="badge">  {completedNumber} </div>
                </button>
            </div>
            <div className="p-3 container mx-auto max-h-screen h-full">
                {
                    listReports.length === 0 ?
                        <div className="container mx-auto h-full flex justify-center items-center"> No Record</div> :
                        <div className="flex flex-row justify-center items-center">
                            <div className="max-w-2xl w-full max-auto">
                                {listReports.map((item, index) => (
                                    <div key={item.id} className="w-full mb-6">
                                        <AdminDoneReport
                                            {...item}
                                            onCompleted={() => onCompleted(index)}
                                            onSummary={() => getSummary(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                }
            </div>
        </>
    );
}