import { Label, Select} from "flowbite-react";
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
        if (type !== 'all') queryParams.push(`type=${type}`);
        if (category !== 'all') queryParams.push(`category=${category}`);
        if (priority !== 'all') queryParams.push(`priority=${priority}`);
        if (date !== 'all') queryParams.push(`date=${date}`);

        const query = queryParams.join('&');
        const queryString = query ? `?${query}` : '';
        if(queryString === '') return;
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
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mx-6 flex flex-col md:flex-row space-x-2 justify-between items-center pb-3">
            <div className="w-full md:w-64 space-y-2">
                <div className="md:hidden flex flex-row justify-between">
                    <Label htmlFor="type" value="Type"/>
                    <Label onClick={toggleFilters} className="md:hidden text-blue-400"> {showFilters ? 'Hide Filter' : 'Show Filter'} </Label>
                </div>
                <Label htmlFor="type" value="Type" className="hidden md:block"/>
                <Select id="type" required value={type} onChange={handleTypeChange}>
                    <option value="all">All</option>
                    <option value="approve">Approved</option>
                    <option value="notapproved">Not Approved</option>
                </Select>
            </div>
            <div className="w-full hidden md:block md:w-64 space-y-2">
                <Label htmlFor="category" value="Category"/>
                <Select id="category" value={category} onChange={handleCategoryChange}>
                    <option value="all">All</option>
                    <option value="FacultyAndEnv">FacultyAndEnv</option>
                    <option value="AdministrativeAndStuff">AdministrativeAndStuff</option>
                    <option value="HealthAndSafety">HealthAndSafety</option>
                    <option value="BehavioralIssues">BehavioralIssues</option>
                    <option value="Academic">Academic</option>
                    <option value="Community">Community</option>
                    <option value="SpecialRequest">SpecialRequest</option>
                    <option value="Other">Other</option>
                </Select>
            </div>
            <div className="w-full hidden md:block md:w-64 space-y-2">
                <Label htmlFor="priority" value="Priority"/>
                <Select id="priority" value={priority} onChange={handlePriorityChange}>
                    <option value="all">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </Select>
            </div>
            <div className="w-full hidden md:block md:w-64 space-y-2">
                <Label htmlFor="date" value="Date"/>
                <Select id="date" value={date} onChange={handleDateChange}>
                    <option value="all">All</option>
                    <option value="yestersday">Yesterday</option>
                    <option value="lastweek">Last Week</option>
                    <option value="lastmonth">Last Month</option>
                    <option value="lastyear">Last Year</option>
                </Select>
            </div>


            <div className={`${showFilters ? 'block' : 'hidden'} md:hidden w-full space-y-2`}>
                <div className="w-full md:w-64 space-y-2">
                    <Label htmlFor="category" value="Category"/>
                    <Select id="category" value={category} onChange={handleCategoryChange}>
                        <option value="all">All</option>
                        <option value="FacultyAndEnv">FacultyAndEnv</option>
                        <option value="AdministrativeAndStuff">AdministrativeAndStuff</option>
                        <option value="HealthAndSafety">HealthAndSafety</option>
                        <option value="BehavioralIssues">BehavioralIssues</option>
                        <option value="Academic">Academic</option>
                        <option value="Community">Community</option>
                        <option value="SpecialRequest">SpecialRequest</option>
                        <option value="Other">Other</option>
                    </Select>
                </div>
                <div className="w-full md:w-64 space-y-2">
                    <Label htmlFor="priority" value="Priority"/>
                    <Select id="priority" value={priority} onChange={handlePriorityChange}>
                        <option value="all">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Select>
                </div>
                <div className="w-full md:w-64 space-y-2">
                    <Label htmlFor="date" value="Date"/>
                    <Select id="date" value={date} onChange={handleDateChange}>
                        <option value="all">All</option>
                        <option value="yestersday">Yesterday</option>
                        <option value="lastweek">Last Week</option>
                        <option value="lastmonth">Last Month</option>
                        <option value="lastyear">Last Year</option>
                    </Select>
                </div>
            </div>
        </div>
    )
}