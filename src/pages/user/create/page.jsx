import {Button, FileInput, Label, Modal, Select, Textarea, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setDescription, setFile, setHeader, setPriority} from "./slice.js";


export const CreateReportView = () => {
    const {header, file, category, description, priority} = useSelector((state) => state.create_report);
    const dispatch = useDispatch();

    const initialFormData = {
        header: '',
        file: null,
        category: '',
        description: '',
        priority: '',
    };

    function handleChange(e) {
        if (e.target.files.length === 0 || e.target.files[0] === null) {
            dispatch(setFile(null));
        } else {
            dispatch(setFile(URL.createObjectURL(e.target.files[0])))
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setHeader(""));
            dispatch(setFile(null));
            dispatch(setCategory(""));
            dispatch(setDescription(""));
            dispatch(setPriority(""));
        };
    }, []);

    function onPublic() {
        const formData = new FormData();
        formData.append('header', header);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('priority', priority);
        if (file) {
            formData.append('file', file);
        }
    }

    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="w-full p-3 space-y-2">
            <form>
                <div className="flex flex-row justify-between items-center">
                    <div className="text-2xl font-bold pb-2 uppercase font-sans">Create Report</div>
                    <Button className="rounded-xl w-32 font-bold uppercase" type="submit" onClick={onPublic}>Public</Button>
                </div>
                <div className="space-y-2">
                    <div className="mb-2 block">
                        <Label htmlFor="topic" value="Topic" />
                    </div>
                    <TextInput
                        id="topic"
                        label="Topic"
                        placeholder="topic.."
                        className="w-full"
                        value={header}
                        onChange={(e) => dispatch(setHeader(e.target.value))}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label className="mt-4">Description</Label>
                    <Textarea
                        id="comment"
                        placeholder="description..."
                        required rows={4}
                        value={description}
                        onChange={(e) => dispatch(setDescription(e.target.value))}
                        className="resize-none h-52"/>
                </div>
                <div className="max-w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="category" value="Category"/>
                    </div>
                    <Select id="category" required value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
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
                <div className="max-w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="priority" value="Priority"/>
                    </div>
                    <Select id="priority" required value={priority} onChange={(e) => dispatch(setPriority(e.target.value))}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Select>
                </div>
                <div>
                    <div>
                        <Label htmlFor="large-file-upload" value="Upload file"/>
                    </div>
                    <div className="flex flex-row space-x-3">
                        <FileInput id="large-file-upload" className="w-full" onChange={handleChange}/>
                        {file ? (<Button className="bg-black" onClick={() => setOpenModal(true)}> View </Button>) : null}
                    </div>
                </div>
            </form>
            <Modal show={openModal} dismissible onClose={() => setOpenModal(false)} position="center">
                <Modal.Header className="px-6">Preview</Modal.Header>
                <Modal.Body>
                    <img src={file} className="w-full h-full" alt="XD"/>
                </Modal.Body>
            </Modal>
        </div>
    );
}