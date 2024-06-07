import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateFileForm from '@/Components/CreateFileForm';
import CreateFolderForm from '@/Components/CreateFolderForm';

function FileAndFolderCreation({ show , handleClose, errors, fetchFolder, parentId}) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create folder or file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CreateFolderForm
            errors={errors}
            parentId={parentId}
            fetchFolderFun={fetchFolder}
        >
        </CreateFolderForm>
        <CreateFileForm
            errors={errors}
            folderId={parentId}
            fetchFolderFun={fetchFolder}
        >
        </CreateFileForm>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default FileAndFolderCreation;