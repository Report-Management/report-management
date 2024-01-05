import {AdminSpamReport, Loading} from "../../../components/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    removeReport,
    setListReport,
    setLoading,
    setLoadingIndex,
    setLoadingSummaried,
    setSummaryIndex,
} from "../done/slice.js";
import {useEffect, useState} from "react";
import {SpamReportRepository} from "./repository.js";

export const AdminSpamView = () => {
    const { loading, listReports } = useSelector((state) => state.done_report);
    const [numSpam, setNumSpam] = useState(0)
    const dispatch = useDispatch()
    const repository = new SpamReportRepository()
    async function getReports() {
        dispatch(setLoading(true));
        const result = await repository.getSpamReportCompleted()
        if (result != null) {
            console.log(result)
            dispatch(setListReport(result))
            setNumSpam(result.filter(item => item.spam === true).length)
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


    async function onHam(index) {
        dispatch(setLoadingIndex({isLoading: true, index}))
        const result = await repository.updateHam(listReports[index].id)
        if (result != null) {
            dispatch(setLoadingIndex({isLoading: false, index}))
            setNumSpam(numSpam - 1)
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
                    Spam
                    <div className="badge">  {numSpam} </div>
                </button>
            </div>
            <div className="flex flex-row justify-center items-center">
                <div className="p-3 container mx-auto max-h-screen h-full overflow-y-auto w-full">
                    {
                        listReports.length === 0 ?
                            <div className="container mx-auto h-full flex justify-center items-center"> No
                                Record</div> :
                            <div className="flex flex-row justify-center items-center">
                                <div className="max-w-2xl max-auto w-full">
                                    {listReports.map((item, index) => (
                                        <div key={item.id} className="w-full mb-6">
                                            <AdminSpamReport
                                                key={item.id}
                                                {...item}
                                                onHam={() => onHam(index)}
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