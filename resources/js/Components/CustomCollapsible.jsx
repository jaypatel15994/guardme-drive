import {useCollapse} from 'react-collapsed';
import React, { useState, useEffect } from 'react';
import CIcon from '@coreui/icons-react';
import {cilArrowBottom, cilArrowRight, cilFolder} from '@coreui/icons';
import Button from 'react-bootstrap/Button';
import FileAndFolderCreation from '@/Components/FileAndFolderCreation';

function Collapsible(props) {

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [folders, setFolders] = useState([])
    const [files, setFiles] = useState([]);
    const loadContent = () =>{
        
            axios.get(`get-files-and-folders-for-parent/${props.folderData.id}`).then(res => {
                setFiles(res.data.data.files)
                setFolders(res.data.data.folders)
            })
        
        
    }
    
return (
    <div className="collapsible">
        <div className="header" {...getToggleProps()}>
        <div className='collapsible-arrows'> 
            <CIcon icon={cilFolder} /> 
            <span className='item-name' onClick={loadContent}> {props.folderData.name} </span>
            {isExpanded ? <CIcon icon={cilArrowBottom} /> : <CIcon icon={cilArrowRight}/> }</div>

            <Button variant="secondary btn-sm float-right" onClick={handleShow}>
                +
            </Button>
            <FileAndFolderCreation
                show={show} 
                handleClose={handleClose}
                errors={props.errors}
                fetchFolder={props.fetchFolder}
                parentId={props.folderData.id}
            ></FileAndFolderCreation>
        </div>
        <div {...getCollapseProps()}>
            <div className="content">
            {
                folders.length>0 && folders.map((folder) => {
                    return (
                        <Collapsible
                        folderData = {folder} key={folder.id}
                        ></Collapsible>
                    )
                })
            }
            {
                files.length>0 && files.map((file) => {
                    return (
                        <div key={file.id}>{file.path}</div>
                    )
                })
            }
            </div>
        </div>
    </div>
    );
}

export default Collapsible;