import {AdminPostCard, Loading} from "../../../components/index.jsx";
import Masonry from "react-masonry-css";
import {useEffect, useState} from "react";
import {ReportRepository} from "./repository.js";
import {useDispatch, useSelector} from "react-redux";
import {
    setLoading,
    setListReport,
    setLoadingIndex,
    setTextHiddenIndex,
    setSummaryIndex,
} from "./slice.js";
import {AdminFilterReport} from "../../../components/admin/filter_report.jsx";

export const AdminShowReportView = () => {
    const {loading, listReports} = useSelector((state) => state.admin_report);
    const [type, setType] = useState('all');
    const [category, setCategory] = useState('all');
    const [priority, setPriority] = useState('all');
    const [date, setDate] = useState('all');
    const [filter, setFilter] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch()
    const repository = new ReportRepository()

    async function onApproved(id) {
        isLoadingID(id, true)
        const result = await repository.onUpdateApproved(id)
        if (result != null) {
            setTimeout(() => {
                isLoadingID(id, false)
                remove_by_id(id)
            }, 2000);
        }
        setTimeout(() => {
            isLoadingID(id, false)
        }, 2000);
    }

    function isLoadingID(id, loadingValue) {
        setFilter(prevFilter =>
            prevFilter.map(item =>
                item.id === id ? {...item, isLoading: loadingValue} : item
            )
        );
    }

    function remove_by_id(id) {
        setFilter(prevFilter => prevFilter.filter(item => item.id !== id));
    }

    async function getReports() {
        dispatch(setLoading(true));
        const result = await repository.getReport();

        if (result != null) {
            dispatch(setListReport(result));

            dispatch(setLoading(false));
        } else {
            dispatch(setLoading(false));
        }
        setFilter(listReports);
    }

    async function getSummary(index) {
        try {
            dispatch(setLoadingIndex({isSummaried: true, index}));
            const result = await repository.onGetSummary(listReports[index].id);

            if (result) {
                dispatch(setSummaryIndex({data: result, index}));
                dispatch(setTextHiddenIndex({isNotShowText: true, index}));
            }
        } catch (error) {
        } finally {
            dispatch(setLoadingIndex({isSummaried: false, index}));
        }
    }


    // const [params] = useSearchParams()
    //
    // useEffect(() => {
    //     const paramsObject = Object.fromEntries([...params])
    //     const queryString = Object.keys(paramsObject).map(key => {
    //         return `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`
    //     })
    //         .join('&');
    //     getReports("?" + queryString)
    // }, [params]);

    function filterReport() {
        let filter = listReports
        if (type !== 'all') {
            filter = filter.filter(item => item.view === type)
        }
        if (category !== 'all') {
            filter = filter.filter(item => item.category === category)
        }
        if (priority !== 'all') {
            filter = filter.filter(item => item.priority === priority)
        }
        if (date !== 'all') {
            filter = filter.filter(item => item.date === date)
        }
        return filter
    }

    function filterObjects(list, searchTerm) {
        return list.filter((obj) =>
            ['header', 'information'].some(
                (key) =>
                    obj[key] &&
                    String(obj[key]).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }

    useEffect(() => {
        getReports()
    }, [])

    useEffect(() => {
        if(loading !== true) {
            const filterData = filterReport()
            setFilter(filterData)
        }
    }, [type, category, priority, date]);


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
            <div className="w-full">
                <AdminFilterReport
                    typeValue={type}
                    categoryValue={category}
                    priorityValue={priority}
                    dateValue={date}
                    searchTerm={searchTerm}
                    onTypeChange={(e) => {
                        e.preventDefault()
                        setType(e.target.value)
                    }}
                    onCategoryChange={(e) => {
                        e.preventDefault()
                        setCategory(e.target.value)
                    }}
                    onPriorityChange={(e) => {
                        e.preventDefault()
                        setPriority(e.target.value)
                    }}
                    onDateChange={(e) => {
                        e.preventDefault()
                        setDate(e.target.value)
                    }}
                    onSearch={(e) => {
                        e.preventDefault()
                        let term = e.target.value;
                        setSearchTerm(term);
                        if (term.trim() === '') {
                            setFilter(listReports);
                        } else {
                            setFilter(filterObjects(filter, term));
                        }
                    }}
                />
            </div>
            <div className="p-3 container mx-auto max-h-screen h-full">
                {
                    filter.length === 0 ?
                        <div className="container mx-auto h-full flex justify-center items-center"> No Record</div> :
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex w-auto"
                            columnClassName="px-2">
                            {filter.map((item, index) => (
                                <div key={index} className="w-full mb-6">
                                    <AdminPostCard
                                        {...item}
                                        onSummary={() => getSummary(index)}
                                        onApproved={() => onApproved(item.id)}/>
                                </div>
                            ))}
                        </Masonry>
                }
            </div>
        </>
    );
}