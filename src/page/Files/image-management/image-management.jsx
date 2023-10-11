import React, {useEffect, useState} from 'react';
import useRequest from "../../../hooks/useRequest.js";
import {getFilePage} from "../../../api/file.js";
import {Button, Card, FloatButton, List, Skeleton, Space} from 'antd';
import FileDetailModal from "../file-detail-modal/file-detail-modal.jsx";
import {CloudUploadOutlined, ReloadOutlined} from "@ant-design/icons";
import UploadModal from "../../../component/UploadModal/upload-modal.jsx";


function ImageManagement({select, onSelect}) {
  const [page, setPage] = useState({
    pageNumber: 1,
    pageSize: 50,
    folderId: 2
  });
  const {data, loading} = useRequest(() => getFilePage(page), [page], {total: '0', data: []});
  const [fileList, setFileList] = useState([]);
  const [fileId, setFileId] = useState(0);
  const [display, setDisplay] = useState(false);
  const [displayUpload, setDisplayUpload] = useState(false);
  useEffect(() => {
    setFileList(data?.data);
  }, [data])
  const clickImage = (item) => {
    if (select && onSelect) {
      onSelect(item);
    } else {
      setFileId(item?.id);
      setDisplay(true);
    }
  }
  return (
    <>
      <UploadModal display={displayUpload}
                   folderId={2}
                   onComplete={() => setPage({...page})}
                   onClose={() => setDisplayUpload(false)}/>
      <Space style={{paddingBottom: 20}}>
        <Button loading={loading} type="default" icon={<CloudUploadOutlined/>} size={"large"}
                onClick={() => setDisplayUpload(true)}/>
        <Button loading={loading} type="default" icon={<ReloadOutlined/>} size={"large"}
                onClick={() => setPage({...page})}/>
      </Space>
      <FloatButton.Group shape="circle" style={{right: 36}}>
        <FloatButton type={"primary"}
                     onClick={() => setDisplayUpload(true)}
                     icon={<CloudUploadOutlined/>}/>
        <FloatButton onClick={() => setPage({...page})} icon={<ReloadOutlined/>}/>
      </FloatButton.Group>
      {display && <FileDetailModal fileId={fileId} display={display} onClose={() => setDisplay(false)}/>}
      {loading && <Skeleton active/>}
      {
        !loading && <List
          pagination={{
            total: data?.total,
            pageSize: page.pageSize,
            current: page.pageNumber,
            showSizeChanger: false,
            align: 'start',
            onChange(info) {
              setPage({...page, pageNumber: info})
            }
          }}
          grid={{
            gutter: 16,
            column: 5,
          }}
          dataSource={fileList}
          renderItem={(item) => (
            <List.Item>
              <Card onClick={() => clickImage(item)}
                    style={{
                      height: 160,
                      backgroundImage: `url("${item?.compressPath}")`,
                      backgroundSize: "cover",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: "center"
                    }}/>

            </List.Item>
          )}
        />
      }
    </>
  );
}

export default ImageManagement;
