import React, { useState, useEffect } from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';

import Collapsible from '@/Components/CustomCollapsible';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FileAndFolderCreation from '@/Components/FileAndFolderCreation';

export default function Dashboard(props) {
    const [show, setShow] = useState(false);
    const [folders, setFolders] = useState([])
    const [files, setFiles] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {

       
        let parentId = null;
        fetchFolder(parentId);
    }, [])
       
    const fetchFolder = (parentId) => {
        axios.get(`get-files-and-folders-for-parent/${parentId}`).then(res => {
            setFiles(res.data.data.files)
            setFolders(res.data.data.folders)
        })
    }
    return (
        <Authenticated
            user={props.auth.user} 
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Guarded Drive</h2>}
        >
            <Head title="Posts" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div id="root-dir">

                            <div>
                                <Button variant="secondary btn-sm float-right" onClick={handleShow}>
                                    +
                                </Button>
                            </div>
                            <br />
                            <FileAndFolderCreation
                             show={show} 
                             handleClose={handleClose}
                             errors={props.errors}
                             fetchFolder={fetchFolder}
                             parentId={null}
                            ></FileAndFolderCreation>
                            
                                
                                {
                                    folders.length && folders.map((folder) => {
                                        return (
                                            <Collapsible
                                            folderData = {folder} 
                                            key={folder.id}
                                            fetchFolder={fetchFolder}
                                            ></Collapsible>
                                            
                                        )
                                    })
                                }
                                {
                                    files.length && files.map((file) => {
                                        return (
                                            <div key={file.id}>{file.path}</div>
                                        )
                                    })
                                }
                            </div>

                            
                            
                            
                            
  
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}