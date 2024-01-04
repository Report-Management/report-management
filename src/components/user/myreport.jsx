import {Avatar, Badge, Card} from "flowbite-react";
import PropTypes from 'prop-types';
import {FileDisplay} from "../admin/filedisplay.jsx";
import {SlOptionsVertical} from "react-icons/sl";
import {useEffect, useState} from "react";
import {isAllowedFile, isImageOrVideo} from "../../helper/file_type.js";
import {motion} from "framer-motion";
import {MyReportRepository} from "../../pages/user/myreport/repository.js";
import {useNavigate} from "react-router-dom";
import {PagesRoute} from "../../routes.jsx";

export const MyReportPostCard = (props) => {
    const modalId = `my_modal_${props.id}`;
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const reportRepository = new MyReportRepository();

    const [header, setHeader] = useState("");
    const [category, setCategory] = useState("FacilityAndEnv");
    const [information, setInformation] = useState("");
    const [priority, setPriority] = useState("High");
    const [view, setView] = useState("Public");
    const [isLoading, setIsLoading] = useState(false);
    const navigator = useNavigate()

    useEffect(() => {
        setHeader(props.header);
        setCategory(props.category);
        setInformation(props.information);
        setPriority(props.priority);
        setView(props.view);
    }, []);


    function handleChange(e) {
        if (isAllowedFile(e.target.files[0])) {
            if (e.target.files.length === 0 || e.target.files[0] === null) {
                setFile(null)
            } else {
                setFile(e.target.files[0])
            }
        }else {
            setAlert(true);
            setTimeout(() => {
                e.target.value = null;
                setAlert(false);
            }, 2000);
        }
    }

    async function updateFile(fileImage) {
        if(fileImage) {
            const formData = new FormData();
            const byte = await fetch(URL.createObjectURL(fileImage)).then(r => r.blob());
            formData.append('file', byte, isImageOrVideo(fileImage) === 'image' ? 'photo.png' : 'video.mp4');
            return await reportRepository.updateReportFile(props.id, formData)
        }
        return false;

    }

    async function onUpdateReport(e) {
        e.preventDefault();
        setIsLoading(true);
        const body = {
            "header": header,
            "information": information,
            "category": category,
            "priority": priority,
            "view": view,
        }
        const result = await reportRepository.updateMyReport(props.id, body);
        if (result){
            if(file) {
                const is_update_file = await updateFile(file);
                if (is_update_file) {
                    navigator(PagesRoute.user, {replace: true})
                    setIsLoading(false);
                    return null
                }
            }
            navigator(PagesRoute.user, {replace: true})
            setIsLoading(false);
            return null
        }
        setIsLoading(false);
        return null
    }

    return (
        <>
            <div className="h-auto w-full">
                <div>
                    <Card className="w-[100%]">
                        <div>
                            <div className="flex flex-row justify-between">
                                <div className="flex justify-start items-center space-x-3">
                                    <Avatar alt="User settings object-cover" img={props.profile} rounded/>
                                    <div className="flex flex-col justify-center items-start">
                                        <div className="text-center font-medium text-sm md:text-md dark:text-white">
                                            {props.username}
                                        </div>
                                        <div className="text-center font-light text-xs dark:text-gray-400">
                                            {props.time}
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn m-1"><SlOptionsVertical/></div>
                                    <ul tabIndex={1}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li onClick={() => document.getElementById(modalId).showModal()}><a>Edit</a>
                                        </li>
                                        <li onClick={props.onDelete}><a>Delete</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="max-w-6xl">
                            <div className="flex flex-row space-x-2 pb-2">
                                <div
                                    className="text-black text-centerrounded-lgfont-medium font-sans text-sm md:text-md">
                                    <Badge color="gray"> {props.category} </Badge>
                                </div>
                                <div
                                    className="bg-gray-100 dark:bg-whit text-black text-center rounded-lg font-medium font-sans text-sm md:text-md">
                                    <Badge color="gray"> {props.priority} </Badge>
                                </div>
                            </div>
                            <div className="text-start text-sm md:text-md font-bold dark:text-white">
                                {props.header}
                            </div>
                            <div className="text-start text-sm md:text-md font-normal dark:text-white">
                                <div className="text-start text-sm md:text-md font-normal dark:text-white">
                                <span>{props.information}
                                </span>
                                </div>
                            </div>
                        </div>
                        {props.file ? <FileDisplay fileUrl={props.file}/> : null}
                    </Card>
                </div>
            </div>

            <dialog key={props.id} id={modalId} className="modal">
                <div className="modal-box max-w-[50%] w-full" style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(156, 163, 175, var(--tw-bg-opacity)) rgba(255, 255, 255, var(--tw-bg-opacity))'
                }}>
                    {
                        isLoading ?
                            <div className="w-full flex flex-row justify-center items-center mx-auto"><span className="loading loading-spinner loading-md"></span></div> :
                            <div>
                                {/* Profile */}
                                <div className="flex flex-row justify-between">
                                    <div className="flex justify-start items-center space-x-3">
                                        <Avatar alt="User settings object-cover" img={props.profile} rounded/>
                                        <div className="flex flex-col justify-center items-start">
                                            <div className="text-center font-medium text-sm md:text-md dark:text-white">
                                                {props.username}
                                            </div>
                                            <div className="text-center font-light text-xs dark:text-gray-400">
                                                {props.time}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Status */}
                                    <div className="text-white rounded-lg text-sm md:text-md font-semibold flex">
                                        {
                                            props.isLoading ?
                                                <span className="loading loading-spinner text-primary"></span> :
                                                <button type={"button"} className="btn btn-success text-white"
                                                        onClick={onUpdateReport}>Update</button>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className="max-w-6xl">
                                        <div className="flex flex-row space-x-2">
                                            <div
                                                className="text-black text-centerrounded-lgfont-medium font-sans text-sm md:text-md">
                                                <select id="category"
                                                        className="select w-full bg-gray-100 dark:bg-gray-700"
                                                        required value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                >
                                                    <option value="FacilityAndEnv">FacilityAndEnv</option>
                                                    <option value="AdministrativeAndStuff">AdministrativeAndStuff
                                                    </option>
                                                    <option value="HealthAndSafety">HealthAndSafety</option>
                                                    <option value="BehavioralIssues">BehavioralIssues</option>
                                                    <option value="Academic">Academic</option>
                                                    <option value="Community">Community</option>
                                                    <option value="SpecialRequest">SpecialRequest</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div
                                                className="text-black text-center rounded-lg font-medium font-sans text-sm md:text-md">
                                                <select id="priority"
                                                        className="select w-full bg-gray-100 dark:bg-gray-700"
                                                        required value={priority}
                                                        onChange={(e) => setPriority(e.target.value)}
                                                >
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
                                            <div
                                                className="text-black text-center rounded-lg font-medium font-sans text-sm md:text-md">
                                                <select id="view" className="select w-full bg-gray-100 dark:bg-gray-700"
                                                        required
                                                        value={view}
                                                        onChange={(e) => setView(e.target.value)}>
                                                    <option value="Public">Public</option>
                                                    <option value="Anonymous">Anonymous</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Header */}
                                        <div className="text-start text-md md:text-lg dark:text-white py-3">
                                            <input
                                                id="topic"
                                                type="text"
                                                className="input w-full bg-gray-100 dark:bg-gray-700 "
                                                placeholder="Topic"
                                                value={header}
                                                onChange={(e) => setHeader(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {/* Information */}
                                        <div className="text-start text-md md:text-lg font-normal dark:text-white pb-3">
                                            <div className="w-full">
                                    <textarea
                                        id="info"
                                        className="textarea resize-none h-52 bg-gray-100 dark:bg-gray-700 w-full"
                                        required
                                        rows={4}
                                        value={information}
                                        onChange={(e) => setInformation(e.target.value)}
                                        placeholder="description..."
                                    />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row space-x-3">
                                        <input id="large-file-upload" type="file"
                                               className="file-input w-full bg-gray-100 dark:bg-gray-700"
                                               onChange={handleChange}/>
                                    </div>
                                    {
                                        alert ? <
                                            motion.div
                                            role="alert"
                                            initial={{opacity: 0, y: 0}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: 0}}
                                            transition={{duration: 0.5}}
                                            className="alert alert-error">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 className="stroke-current shrink-0 h-6 w-6"
                                                 fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <span>Error! File must be image or video</span>
                                        </motion.div> : null
                                    }
                                </div>
                            </div>
                    }
                </div>
            </dialog>
        </>
    );
}

MyReportPostCard.propTypes = {
    id: PropTypes.string,
    username: PropTypes.string,
    time: PropTypes.string,
    header: PropTypes.string,
    information: PropTypes.string,
    category: PropTypes.string,
    priority: PropTypes.string,
    approved: PropTypes.bool,
    profile: PropTypes.string,
    file: PropTypes.string,
    view: PropTypes.string,
    onDelete: PropTypes.func,
};

MyReportPostCard.defaultProps = {
    username: "Username",
    time: "Just Now",
    header: "Title",
    information: "Content",
    approved: false,
    profile: "https://cdn-icons-png.flaticon.com/512/9131/9131478.png",
}