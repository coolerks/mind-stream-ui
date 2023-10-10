import React from 'react';
import useRequest from "../../hooks/useRequest.js";
import {getFileUploadParam, getUploadConfig, uploadComplete} from "../../api/file.js";
import {message, Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {UPLOAD_URL} from "../../constant/systemConstant.js";

const {Dragger} = Upload;

function FileUpload({folderId, preUpload, onComplete}) {
  const {data: config} = useRequest(() => getUploadConfig(), []);

  const getExtraData = async (file) => {
    if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
      return {
        folderId,
        name: file.name,
        size: file.size
      }
    }

    const data = await getFileUploadParam({
      folderId,
      name: file.name,
      size: file.size
    });
    console.log(data);
    file.path = data.key;
    file.id = data.id;
    return {
      "key": data.key,
      "policy": data.policy,
      "q-sign-algorithm": data["q-sign-algorithm"],
      "q-ak": data["q-ak"],
      "q-key-time": data["q-key-time"],
      "q-signature": data["q-signature"],
      "success-action-redirect": data["success_action_redirect"]
    }

  }

  const getUploadUrl = (file) => {
    if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
      return UPLOAD_URL;
    }
    return config?.url;
  }

  const uploadProps = {
    name: 'file',
    multiple: false,
    method: config?.method,
    maxCount: 100,
    data: getExtraData,
    action: getUploadUrl,
    headers: {
      token: localStorage.getItem('token')
    },
    async beforeUpload(file) {
      return preUpload ? preUpload(file) : file;
    },
    async onChange(info) {
      const {status} = info.file;
      console.log("u = ", uploadProps);
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        const {path} = info.file;
        if (onComplete) {
          onComplete(path);
        }
        if (info.file.id) {
          await uploadComplete(info.file?.id);
        }
        message.success(`${info.file.name} 上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    }
  }

  return (
    <>
      <Dragger {...uploadProps} multiple={true}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">在这里选择文件并上传</p>
        <p className="ant-upload-hint">
          每次可以选择一个或者多个文件上传。
        </p>
      </Dragger>
    </>
  );
}

export default FileUpload;
