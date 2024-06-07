import { useForm } from '@inertiajs/react';



export default function CreateFileForm(props) {
    function handleSubmitFile(e) {
        e.preventDefault();
        post(route("file.upload.store"));
        
        document.querySelector("input[name='file']").value = "";
        setData("file", null);
        setData("folderId", null);
        props.fetchFolderFun(props.folderId);
    }
    
    const { setData, errors, post, progress } = useForm({
        file: null,
        folderId: props.folderId
    });
    return (
        <form name="createForm" onSubmit={handleSubmitFile}>
            <input type='hidden' name='folderId' value={props.folderId}></input>
            <div className="flex flex-col">
                <div className="mb-0">
                    <input
                        type="file"
                        className="px-2 py-2"
                        label="File"
                        name="file"
                        accept='.doc,.docx,application/msword,.pdf,.txt'
                        onChange={(e) =>
                            setData("file", e.target.files[0])
                        }
                    />
                    <button
                        type="submit"
                        className="px-3 font-bold text-white bg-gray-400 rounded inline"
                    >
                        Upload file
                    </button>
                    <span className="px-5 text-red-600">
                        {errors.file}
                    </span>
                    
                </div>
            </div>

        </form>
    );
};

