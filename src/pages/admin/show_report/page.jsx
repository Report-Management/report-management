import {AdminPostCard, Loading} from "../../../components/index.jsx";
import Masonry from "react-masonry-css";
import { useEffect } from "react";
import {ReportRepository} from "./repository.js";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setListReport} from "./slice.js";
import { useSearchParams } from 'react-router-dom';

export const AdminShowReportView = () => {
    const { loading, listReports } = useSelector((state) => state.admin_report);
    const dispatch = useDispatch()
    const repository = new ReportRepository()

    const handlePostApproval = (index) => {
        const updatedListPost = listReports.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    approval: !item.approval // Toggle the status
                };
            }
            return item;
        });

        dispatch(setListReport(updatedListPost))
    };

    async function getReports(params) {
        dispatch(setLoading(true));
        const result = await repository.getReport(params);
        if (result != null){
            console.log(result)
            dispatch(setListReport(result))
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        console.log(listReports)
    }
    const [params] = useSearchParams()

    useEffect(() => {
        const paramsObject = Object.fromEntries([...params])
        const queryString = Object.keys(paramsObject).map(key => {
            if (key === "type"){
                return `${encodeURIComponent("approval")}=${encodeURIComponent(paramsObject[key])}`
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`
        })
            .join('&');
        getReports("?" + queryString)
    }, [params]);

    const breakpointColumnsObj = {
        default: 3,
        1024: 3,
        768: 1,
        640: 1,
    };

    if(loading) return (
        <Loading />
    )
    return (
        <>
            <div className="p-3">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto"
                    columnClassName="px-2">
                    {listReports.map((item, index) => (
                        <div key={item.id} className="w-full mb-6">
                            <AdminPostCard
                                {...item}
                                onApproved={() => handlePostApproval(index)}/>
                        </div>
                    ))}
                </Masonry>
            </div>
        </>
    );
}