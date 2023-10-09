import React from 'react';
import {Modal} from "antd";
import FileUpload from "./file-upload.jsx";

function UploadModal({folderId, display, onClose, onComplete}) {
  return (
    <>
      <Modal title="文件上传"
             open={display}
             footer={[]}
             onCancel={onClose}>
        <FileUpload onComplete={onComplete} folderId={folderId}/>
      </Modal>
    </>
  );
}

export default UploadModal;
