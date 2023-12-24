import { Label, Modal } from "flowbite-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setDescription, setFile, setHeader, setPriority, setView} from "./slice.js";
import { CreateReportRepository } from "./repository.js";
import {toast} from "react-toastify";
import {ThreeDots} from "react-loader-spinner";
import ReactPlayer from "react-player";
import {motion} from "framer-motion";
import {isAllowedFile, isImageOrVideo} from "../../../helper/file_type.js";


export const CreateReportView = () => {
    const {header, file, category, description, priority, view} = useSelector((state) => state.create_report);
    const dispatch = useDispatch();
    const createReportRepository = new CreateReportRepository();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);


    function handleChange(e) {
        if (isAllowedFile(e.target.files[0])) {
            if (e.target.files.length === 0 || e.target.files[0] === null) {
                dispatch(setFile(null));
            } else {
                dispatch(setFile(e.target.files[0]))
            }
        }else {
            setAlert(true);
            setTimeout(() => {
                e.target.value = null;
                setAlert(false);
            }, 2000);
        }
    }

    function onReset(e){
        e.preventDefault();
        dispatch(setHeader(""));
        dispatch(setFile(null));
        dispatch(setCategory("FacilityAndEnv"));
        dispatch(setDescription(""));
        dispatch(setPriority("High"));
        dispatch(setView("Public"));
        dispatch(setFile(null));
        e.target.value = null;
    }

    useEffect(() => {
        return () => {
            dispatch(setHeader(""));
            dispatch(setFile(null));
            dispatch(setCategory("FacilityAndEnv"));
            dispatch(setDescription(""));
            dispatch(setPriority("High"));
            dispatch(setView("Public"));
            dispatch(setFile(null));
        };

    }, [dispatch]);

    async function onPublic(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('header', header);
        formData.append('information', description);
        formData.append('category', category);
        formData.append('priority', priority);
        formData.append('view', view);
        if (file) {
            const byte = await fetch(URL.createObjectURL(file)).then(r => r.blob());
            formData.append('file', byte, isImageOrVideo(file) === 'image' ? 'photo.png' : 'video.mp4');
        }
        setLoading(true)
        const result = await createReportRepository.createReport(formData);
        if (result) {
            onReset(e)
            toast.success("Create report success")
        }
        setLoading(false)
    }

    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="w-full p-3 space-y-2">
            <form onSubmit={onPublic} autoComplete="off">
                <div className="flex flex-row justify-between items-center">
                    <div className="text-2xl font-bold pb-2 uppercase font-sans">Create Report</div>
                    {
                        loading ? <ThreeDots height="10" width="26" radius="6" color="#713ABE" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="" visible={true}/> : <button className="rounded-2xl w-32 font-rubik font-bold uppercase btn bg-purple-600 hover:bg-purple-600 text-white" type="submit"> Public </button>
                    }
                </div>
                <div className="space-y-1">
                    <label className="label" htmlFor="topic"> Topic </label>
                    <input
                        id="topic"
                        type="text"
                        className="input w-full bg-gray-100 dark:bg-gray-700"
                        placeholder="topic"
                        value={header}
                        onChange={(e) => dispatch(setHeader(e.target.value))}
                        required
                    />
                </div>
                <label className="form-control space-y-1">
                    <label className="label" htmlFor="info"> Description </label>
                    <textarea
                        id="info"
                        className="textarea textarea-bordered resize-none h-52 bg-gray-100 dark:bg-gray-700"
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => dispatch(setDescription(e.target.value))}
                        placeholder="description..."
                    >
                    </textarea>
                </label>
                <div className="max-w-full pt-2">
                    <div className="mb-2 block">
                        <label htmlFor="category">Category</label>
                    </div>
                    <select id="category" className="select w-full bg-gray-100 dark:bg-gray-700"  required value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
                        <option value="FacilityAndEnv">FacilityAndEnv</option>
                        <option value="AdministrativeAndStuff">AdministrativeAndStuff</option>
                        <option value="HealthAndSafety">HealthAndSafety</option>
                        <option value="BehavioralIssues">BehavioralIssues</option>
                        <option value="Academic">Academic</option>
                        <option value="Community">Community</option>
                        <option value="SpecialRequest">SpecialRequest</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="max-w-full pt-2">
                    <div className="mb-2 block">
                        <label htmlFor="priority"> Priority </label>
                    </div>
                    <select id="priority" className="select w-full bg-gray-100 dark:bg-gray-700" required value={priority} onChange={(e) => dispatch(setPriority(e.target.value))}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="max-w-full pt-2">
                    <div className="mb-2 block">
                        <label htmlFor="view"> View </label>
                    </div>
                    <select id="view" className="select w-full bg-gray-100 dark:bg-gray-700" required value={view} onChange={(e) => dispatch(setView(e.target.value))}>
                        <option value="Public">Public</option>
                        <option value="Anonymous">Anonymous</option>
                    </select>
                </div>
                <div className="pt-2 space-y-1">
                    <div>
                        <Label htmlFor="large-file-upload" value="Upload file"/>
                    </div>
                    <div className="flex flex-row space-x-3">
                        <input id="large-file-upload" type="file" className="file-input w-full bg-gray-100 dark:bg-gray-700" onChange={handleChange}/>
                        {file ? (<button id="view" type="button" className="bg-black btn text-white" onClick={() => setOpenModal(true)}> View </button>) : null}
                    </div>
                </div>
            </form>
            <Modal show={openModal} dismissible onClose={() => setOpenModal(false)} position="center">
                <Modal.Header className="px-6">Preview</Modal.Header>
                <Modal.Body>
                    {
                        isImageOrVideo(file) !== null ? isImageOrVideo(file) === 'image' ? <img src={URL.createObjectURL(file)} className="w-full h-full" alt="XD"/> : <div>
                            <ReactPlayer
                                width='100%'
                                controls={true}
                                url={URL.createObjectURL(file)}
                                playIcon={<button className="btn bg-black text-white">Play</button>}
                            />
                        </div> : null
                    }
                </Modal.Body>
            </Modal>
            {
                alert ? <
                    motion.div
                    role="alert"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Error! File must be image or video</span>
                </motion.div> :  null
            }
        </div>
    );
}