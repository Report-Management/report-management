import {AdminPostCard, Loading} from "../../../components/index.jsx";
import { useEffect } from "react";
import {ReportRepository} from "./repository.js";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setListReport, setLoadingIndex, removeReport, setSummaryIndex, setLoadingSummaried} from "./slice.js";
import {useSearchParams} from 'react-router-dom';

export const AdminShowReportView = () => {
    const {loading, listReports} = useSelector((state) => state.admin_report);
    const dispatch = useDispatch()
    const repository = new ReportRepository()

    async function onApproved(index) {
        dispatch(setLoadingIndex({isLoading: true, index}))
        const result = await repository.onUpdateApproved(listReports[index].id)
        if (result != null) {
            setTimeout(() => {
                dispatch(setLoadingIndex({isLoading: false, index}))
                dispatch(removeReport(index))
            }, 2000);
        }
        setTimeout(() => {
            dispatch(setLoadingIndex({isLoading: false, index}))
        }, 2000);
    }

    async function getReports(params) {
        dispatch(setLoading(true));
        const result = await repository.getReport(params);
        if (result != null) {
            dispatch(setListReport(result))
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
    }

    async function getSummary(index) {
        console.log(listReports[index].id)
        dispatch(setLoadingSummaried({isSummaried: true, index}));
        const result = await repository.onGetSummary(listReports[index].id);
        console.log(result)
        if (result) {
            dispatch(setSummaryIndex({data: result, index}));
            dispatch(setLoadingSummaried({isSummaried: false, index}));
        }
        dispatch(setLoadingSummaried({isSummaried: false, index}));
    }

    const [params] = useSearchParams()

    useEffect(() => {
        const paramsObject = Object.fromEntries([...params])
        const queryString = Object.keys(paramsObject).map(key => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`
        })
            .join('&');
        getReports("?" + queryString)
    }, [params]);

    if (loading) return (
        <Loading/>
    )

    return (
        <>
            <div className="p-3 container mx-auto max-h-screen h-full">
                {
                    listReports.length === 0 ?
                        <div className="container mx-auto h-full flex justify-center items-center"> No Record</div> :
                        <div className="flex flex-row justify-center items-center">
                            <div className="max-w-2xl max-auto">
                                {listReports.map((item, index) => (
                                    <div key={item.id} className="w-full mb-6">
                                        <AdminPostCard
                                            key={item.id}
                                            {...item}
                                            onSummary={() => getSummary(index)}
                                            onApproved={() => onApproved(index)}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                }
            </div>
        </>
    );
}