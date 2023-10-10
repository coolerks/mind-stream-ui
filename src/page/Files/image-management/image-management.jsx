import React, {useEffect, useState} from 'react';
import useRequest from "../../../hooks/useRequest.js";
import {getFilePage} from "../../../api/file.js";
import {Card, List} from 'antd';
import FileDetailModal from "../file-detail-modal/file-detail-modal.jsx";


function ImageManagement(props) {
  const [page, setPage] = useState({
    pageNumber: 1,
    pageSize: 50,
    folderId: 2
  });
  const {data, loading} = useRequest(() => getFilePage(page), [page], {data: []});
  const [fileList, setFileList] = useState([]);
  const [fileId, setFileId] = useState(0);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setFileList(data?.data);
  }, [data])
  return (
    <>
      {display && <FileDetailModal fileId={fileId} display={display} onClose={() => setDisplay(false)}/>}
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={fileList}
        renderItem={(item) => (
          <List.Item>
            <Card onClick={() => {
              setFileId(item.id);
              setDisplay(true);
            }}
            style={{
              height: 200,
              backgroundImage: `url("${item?.compressPath}")`,
              backgroundSize: "cover",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: "center"
            }}/>

          </List.Item>
        )}
      />
    </>
  );
}

export default ImageManagement;
