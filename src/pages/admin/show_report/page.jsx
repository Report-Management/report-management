import {AdminPostCard, Loading} from "../../../components/index.jsx";
import Masonry from "react-masonry-css";
import {useEffect} from "react";
import {ReportRepository} from "./repository.js";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setListReport, setLoadingIndex, removeReport, setTextHiddenIndex, setSummaryIndex} from "./slice.js";
import {useSearchParams} from 'react-router-dom';

export const AdminShowReportView = () => {
    const {loading, listReports} = useSelector((state) => state.admin_report);
    const dispatch = useDispatch()
    const repository = new ReportRepository()
    async function onApproved(index) {
        dispatch(setLoadingIndex({isLoading: true, index}))
        const result = await repository.onUpdateUnApproved(listReports[index].id)
        if (result != null) {
            dispatch(setLoadingIndex({isLoading: false, index}))
            dispatch(removeReport(index))
        }
        dispatch(setLoadingIndex({isLoading: false, index}))
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
        try {
            dispatch(setLoadingIndex({ isSummaried: true, index }));
            const result = await repository.onGetSummary(listReports[index].id);

            if (result) {
                dispatch(setSummaryIndex({ data: result, index }));
                dispatch(setTextHiddenIndex({ isNotShowText: true, index }));
            }
        } catch (error) {
            // Handle error appropriately (e.g., log or show an error message)
        } finally {
            dispatch(setLoadingIndex({ isSummaried: false, index }));
        }
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

    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        768: 1,
        640: 1,
    };

    if (loading) return (
        <Loading/>
    )

    return (
        <>
            <div className="p-3 container mx-auto max-h-screen h-full">
                {
                    listReports.length === 0 ?
                        <div className="container mx-auto h-full flex justify-center items-center"> No Record</div> : <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex w-auto"
                            columnClassName="px-2">
                            {listReports.map((item, index) => (
                                <div key={item.id} className="w-full mb-6">
                                    <AdminPostCard
                                        key={item.id}
                                        {...item}
                                        onSummary={() => getSummary(index)}
                                        onApproved={() => onApproved(index)}/>
                                </div>
                            ))}
                        </Masonry>
                }
            </div>
        </>
    );
}