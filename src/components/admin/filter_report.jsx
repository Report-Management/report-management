import { Label } from "flowbite-react";
import {useState} from "react";
import PropTypes from "prop-types";

export const AdminFilterReport = (props) => {
    const [showFilters, setShowFilters] = useState(false);
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mx-6 flex flex-col md:flex-row space-x-2 justify-between items-center">
            <div className="flex-1 w-full">
                <div className="md:hidden cursor-pointer">
                    <label onClick={toggleFilters} className="cursor-pointer md:hidden text-blue-400"> {showFilters ? 'Hide Filter' : 'Show Filter'} </label>
                </div>
                <div className="w-full">
                    <div className="label">
                        <span className="label-text font-semibold hidden md:block">Search</span>
                    </div>
                    <input
                        className="input w-full input-bordered"
                        placeholder="Search"
                        value={props.searchTerm}
                        onChange={props.onSearch}
                        type="text"
                    />
                </div>
            </div>
            <div className="flex-nowrap">
                <div className="flex flex-row space-x-3">
                    <div className="w-full hidden md:block md:w-64 space-y-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text font-semibold">Type</span>
                            </div>
                            <select id="type" required value={props.typeValue} onChange={props.onTypeChange} className="select select-bordered">
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
                            <select id="category" value={props.categoryValue} onChange={props.onCategoryChange} className="select select-bordered">
                                <option value="all">All</option>
                                <option value="FacilityAndEnv">FacultyAndEnv</option>
                                <option value="AdministrativeAndStuff">AdministrativeAndStuff</option>
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
                            <select id="priority" value={props.priorityValue} onChange={props.onPriorityChange} className="select select-bordered">
                                <option value="all">All</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
            <div className={`${showFilters ? 'block' : 'hidden'} md:hidden w-full space-y-2`}>
                <div className="w-full md:w-64 space-y-2">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Category</span>
                        </div>
                        <select id="category" value={props.categoryValue} onChange={props.onCategoryChange} className="select select-bordered">
                            <option value="all">All</option>
                            <option value="FacilityAndEnv">FacilityAndEnv</option>
                            <option value="AdministrativeAndStuff">AdministrativeAndStuff</option>
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
                        <select id="priority" value={props.priorityValue} onChange={props.onPriorityChange} className="select select-bordered">
                            <option value="all">All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>
                </div>
                {/*<div className="w-full md:w-64 space-y-2">*/}
                {/*    <label className="form-control w-full">*/}
                {/*        <div className="label">*/}
                {/*            <span className="label-text font-semibold">Date</span>*/}
                {/*        </div>*/}
                {/*        <select id="date" value={props.dateValue} onChange={props.onDateChange} className="select select-bordered">*/}
                {/*            <option value="all">All</option>*/}
                {/*            <option value="today">Today</option>*/}
                {/*            <option value="yestersday">Yesterday</option>*/}
                {/*            <option value="lastmonth">Last Month</option>*/}
                {/*            <option value="lastyear">Last Year</option>*/}
                {/*        </select>*/}
                {/*    </label>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

AdminFilterReport.propTypes = {
    searchTerm: PropTypes.string,
    typeValue: PropTypes.string,
    categoryValue: PropTypes.string,
    priorityValue: PropTypes.string,
    dateValue: PropTypes.string,
    onTypeChange: PropTypes.func,
    onCategoryChange: PropTypes.func,
    onPriorityChange: PropTypes.func,
    onDateChange: PropTypes.func,
    onSearch: PropTypes.func,

}