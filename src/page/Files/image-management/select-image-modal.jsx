import React from 'react';
import ImageManagement from "./image-management.jsx";
import {Modal} from "antd";

function SelectImageModal({onSelect, display, onClose}) {
  return (
    <>
      <Modal title="文件详情"
             open={display}
             width={800}
             centered
             footer={[]}
             onCancel={onClose}>
        <div style={{height: '80vh', overflow: 'auto'}}>
          <ImageManagement  select={true} onSelect={(item) => {
            onSelect(item);
            onClose();
          }}/>
        </div>
      </Modal>
    </>
  );
}

export default SelectImageModal;
