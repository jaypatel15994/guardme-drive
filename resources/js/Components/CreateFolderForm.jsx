import { useForm } from '@inertiajs/react';

export default function CreateFolderForm(props) {
    function handleSubmitFolder(e) {
        e.preventDefault();
        post(route("folder.upload.store"));
        document.querySelector("input[name='name']").value = "";
        setData("name", '');
        props.fetchFolderFun(props.parentId);
    }

    const { setData, errors, post } = useForm({
        name: '',
        parentId: props.parentId
    });
    return (
        <form name="createFolderForm" onSubmit={handleSubmitFolder}>
            <input type='hidden' name='parentId' value={props.parentId}></input>
            <div className="flex flex-col">
                <div className="mb-0">
                    <input
                        type="text"
                        className="py-0 px-2 mx-2 input-small"
                        label="Name"
                        name="name"
                        onChange={(e) => setData("name", e.currentTarget.value)}
                    />
                    <span className="text-red-600">
                        {errors.name}
                    </span>
                    <button
                        type="submit"
                        className="px-6 font-bold text-white bg-gray-400 rounded inline"
                    >
                        Create folder
                    </button>
                </div>
            </div>
        </form>
    );
};

