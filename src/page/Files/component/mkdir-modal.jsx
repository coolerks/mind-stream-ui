import React, {useState} from 'react';
import {Button, Input, Modal, Space, message} from "antd";
import folderImg from '../../../assets/image/folder.png'
import {useDispatch, useSelector} from "react-redux";
import {createFolder} from "../../../api/file.js";
import {endLoading, startLoading} from "../../../store/loading/loadingSlice.js";

function MkdirModal({display, onClose, folderId, onFinish}) {
  const {isLoading: loading} = useSelector(state => state.loading.value);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const mkdir = async () => {
    const folderName = name.trim();
    if (folderName.length === 0 || folderName.length >= 32) {
      message.error('文件夹名称的长度不能为空并且小于32个字符')
      return;
    }
    try {
      dispatch(startLoading());
      await createFolder({parentId: folderId, name, description: ''});
      setTimeout(() => {
        message.success('创建成功');
        setName('')
        onClose();
      }, 500);
    } finally {
      setTimeout(() => {
        dispatch(endLoading());
        if (onFinish) {
          onFinish();
        }
      }, 500)
    }
  }
  return (
    <>
      <Modal title="创建文件夹"
             width={350}
             open={display}
             footer={[]}
             destroyOnClose={true}
             onCancel={onClose}>
        <Space size={32} style={{width: '100%', textAlign: 'center'}} direction="vertical">
          <img style={{width: 150}} src={folderImg} alt={'文件夹'}/>
          <Input disabled={loading}
                 onPressEnter={mkdir}
                 onChange={e => setName(e.target.value)}
                 size={"large"} placeholder="文件夹名称" />
          <Button onClick={() => mkdir()} loading={loading} size={"large"} type="primary" block>
            创建
          </Button>
        </Space>
      </Modal>
    </>
  );
}

export default MkdirModal;
