import React from 'react';
import {Modal} from "antd";
import Detail from "../../../component/Detail/detail.jsx";
import useFileDetail from "../../../hooks/useFileDetail.jsx";

function FileDetailModal({fileId, display, onClose}) {
  const {loading, detail} = useFileDetail(fileId);
  return (
    <>
      <Modal title="文件详情"
             open={display}
             footer={[]}
             onCancel={onClose}>
        <Detail loading={loading} detail={detail}/>
      </Modal>
    </>
  );
}

export default FileDetailModal;
