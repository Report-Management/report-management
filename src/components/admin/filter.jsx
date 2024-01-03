import { Label } from "flowbite-react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AdminFilter = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [type, setType] = useState('all');
    const [category, setCategory] = useState('all');
    const [priority, setPriority] = useState('all');
    const [date, setDate] = useState('all');
    const baseURL = []
    const navigator = useNavigate();
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    useEffect(() => {
        const queryParams = [];
        if (type !== 'all') queryParams.push(`types=${type}`);
        if (category !== 'all') queryParams.push(`category=${category}`);
        if (priority !== 'all') queryParams.push(`priority=${priority}`);
        if (date !== 'all') queryParams.push(`date=${date}`);

        const query = queryParams.join('&');
        const queryString = query ? `?${query}` : '';
        if(queryString === '') {
            navigator(`${baseURL}`, {replace: true});
        }
        navigator(`${baseURL}${queryString}`, {replace: true});
    }, [type, category, priority, date]);

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg mx-6 flex flex-col md:flex-row space-x-2 justify-between items-center">
            <div className="w-full md:w-64 space-y-2">
                <div className="md:hidden flex flex-row justify-between">
                    <Label htmlFor="type" value="Type"/>
                    <Label onClick={toggleFilters} className="md:hidden text-blue-400"> {showFilters ? 'Hide Filter' : 'Show Filter'} </Label>
                </div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text font-semibold hidden md:block">Type</span>
                    </div>
                    <select id="type" required value={type} onChange={handleTypeChange} className="select select-bordered">
                        <option value="all">All</option>
                        <option value="Public">Public</option>
                        <option value="Anonymous">Anonymous</option>
                    </select>
                </label>
            </div>
            <div className="w-full hidden md:block md:w-64 space-y-2">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text font-semibold">Category</span>
                    </div>
                    <select id="category" value={category} onChange={handleCategoryChange} className="select select-bordered">
                        <option value="all">All</option>
                        <option value="FacilityAndEnv">FacilityAndEnv</option>
                        <option value="AdminstrativeAndStuffs">AdminstrativeAndStuffs</option>
                        <option value="HealthAndSafety">HealthAndSafety</option>
                        <option value="BehavioralIssues">BehavioralIssues</option>
                        <option value="Academic">Academic</option>
                        <option value="Community">Community</option>
                        <option value="SpecialRequest">SpecialRequest</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
            </div>
            <div className="w-full hidden md:block md:w-64 space-y-2">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text font-semibold">Priority</span>
                    </div>
                    <select id="priority" value={priority} onChange={handlePriorityChange} className="select select-bordered">
                        <option value="all">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </label>
            </div>
            <div className="w-full hidden md:block md:w-64 space-y-2">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text font-semibold">Date</span>
                    </div>
                    <select id="date" value={date} onChange={handleDateChange} className="select select-bordered">
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="yestersday">Yesterday</option>
                        <option value="lastmonth">Last Month</option>
                        <option value="lastyear">Last Year</option>
                    </select>
                </label>

            </div>
            <div className={`${showFilters ? 'block' : 'hidden'} md:hidden w-full space-y-2`}>
                <div className="w-full md:w-64 space-y-2">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Category</span>
                        </div>
                        <select id="category" value={category} onChange={handleCategoryChange} className="select select-bordered">
                            <option value="all">All</option>
                            <option value="FacilityAndEnv">FacultyAndEnv</option>
                            <option value="AdminstrativeAndStuffs">AdminstrativeAndStuffs</option>
                            <option value="HealthAndSafety">HealthAndSafety</option>
                            <option value="BehavioralIssues">BehavioralIssues</option>
                            <option value="Academic">Academic</option>
                            <option value="Community">Community</option>
                            <option value="SpecialRequest">SpecialRequest</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>
                <div className="w-full md:w-64 space-y-2">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Priority</span>
                        </div>
                        <select id="priority" value={priority} onChange={handlePriorityChange} className="select select-bordered">
                            <option value="all">All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>
                </div>
                <div className="w-full md:w-64 space-y-2">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Date</span>
                        </div>
                        <select id="date" value={date} onChange={handleDateChange} className="select select-bordered">
                            <option value="all">All</option>
                            <option value="today">Today</option>
                            <option value="yestersday">Yesterday</option>
                            <option value="lastmonth">Last Month</option>
                            <option value="lastyear">Last Year</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
    )
}