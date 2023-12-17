import Masonry from "react-masonry-css";
import {AdminApprovedReport, Loading} from "../../../components/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeReport, setListReport, setLoading, setLoadingIndex} from "./slice.js";
import {useEffect} from "react";
import {ApprovedReportRepository} from "./repository.js";

export const AdminApprovedView = () => {
    const { loading, listReports } = useSelector((state) => state.approved_report);
    const dispatch = useDispatch()
    const repository = new ApprovedReportRepository()
    const breakpointColumnsObj = {
        default: 3,
        1024: 3,
        768: 1,
        640: 1,
    };

    async function getReports() {
        dispatch(setLoading(true));
        const result = await repository.getReportApproved()
        if (result != null) {
            console.log(result)
            dispatch(setListReport(result))
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
            dispatch(removeReport(index))
        }
        dispatch(setLoadingIndex({isLoading: false, index}))
    }

    async function onApproved(index) {
        dispatch(setLoadingIndex({isLoading: true, index}))
        const result = await repository.updateUnapproved(listReports[index].id)
        if (result != null) {
            dispatch(setLoadingIndex({isLoading: false, index}))
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
        <div className="p-3 container mx-auto max-h-screen h-full">
            {
                listReports.length === 0 ?
                    <div className="container mx-auto h-full flex justify-center items-center"> No Record</div> : <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-auto"
                        columnClassName="px-2">
                        {listReports.map((item, index) => (
                            <div key={item.id} className="w-full mb-6">
                                <AdminApprovedReport
                                    {...item}
                                    onApproved={() => onApproved(index)}
                                    onCompleted={() => onCompleted(index)}/>
                            </div>
                        ))}
                    </Masonry>
            }
        </div>
    );
}