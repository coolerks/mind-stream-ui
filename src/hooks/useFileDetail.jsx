import React from "react";
import {message} from "antd";
import useDetail from "./useDetail.jsx";
import {getFileDetail} from "../api/file.js";
import copy from "copy-to-clipboard";


const fileMap = {
  "id": "编号",
  "name": "名称",
  "fullPath": "路径",
  "compressPath": "压缩路径",
  "downloadLink": "下载链接",
  "pressLink": "压缩链接",
  "size": "大小",
  "policy": "存储策略",
  "createTime": "创建时间"
}

function press(link) {
  message.success("复制成功");
  copy(link);
}

export default function useFileDetail(fileId) {
  const {detail, loading} = useDetail({
    request: () => getFileDetail(fileId),
    deps: [fileId],
    resultMap: fileMap,
    dataParse: (file) => {
      const {fullPath, compressPath} = file;
      file['downloadLink'] = <a href={file['downloadLink']} target={'_blank'}>查看</a>
      file['pressLink'] = <a href={file['pressLink']} target={'_blank'}>查看</a>
      file['fullPath'] = <a onClick={() => press(fullPath)}>点击复制</a>
      file['compressPath'] = <a onClick={() => press(compressPath)}>点击复制</a>
    },
    onParseComplete: (role, arr) => {
      const {user} = role;
      arr.push({
        key: 'user',
        name: '创建者',
        info: <>
          <span>{user?.email} - {user?.nickname}</span>
        </>
      })
    }
  });

  return {
    detail, loading
  }
}
