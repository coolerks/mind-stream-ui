import React, {useEffect, useState} from 'react';
import {CheckCard} from "@ant-design/pro-components";
import {Avatar, Button, Dropdown, FloatButton, Pagination, Tooltip} from "antd";
import useRequest from "../../../hooks/useRequest.js";
import {getFilePage} from "../../../api/file.js";
import {getImage} from "../../../util/fileImageUtil.js";
import NavigationBar from "./navigation-bar.jsx";
import {
  CloseOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  ReloadOutlined,
  SelectOutlined
} from "@ant-design/icons";
import UploadModal from "../../../component/UploadModal/upload-modal.jsx";
import MkdirModal from "./mkdir-modal.jsx";

let pre = undefined;

function FileList(props) {

  const [folder, setFolder] = useState(0);
  const [files, setFiles] = useState({});
  const [bars, setBars] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const [page, setPage] = useState({
    pageNumber: 1,
    pageSize: 50,
    folderId: folder
  });
  const {data, loading} = useRequest(() => getFilePage(page), [page], {data: []});
  const [fileList, setFileList] = useState([]);
  const [states, setStates] = useState([]);
  const [selection, setSelection] = useState(false);
  const [displayUpload, setDisplayUpload] = useState(false);
  const [displayMkdir, setDisplayMkdir] = useState(false);

  const menu = [
    {label: <span><CloudUploadOutlined/> 上传</span>, key: 'upload'},
    {label: <span><ReloadOutlined/> 刷新</span>, key: 'refresh',},
    {label: <span><FolderAddOutlined/> 创建文件夹</span>, key: 'mkdir'},
    {label: <span><SelectOutlined/> {!selection ? '选择' : '取消选择'}</span>, key: 'select',},
  ]


  const openFile = e => {
    if (e === undefined) {
      if (selection) {
        setSelection(false);
      }
      if (files[pre]?.folder) {
        addHistory();
        setFolder(pre.split('-')[1]);
        setBars([...bars, {...files[pre], index: bars.length}]);
      } else {
        const {fullPath} = files[pre];
        window.open(fullPath, '_blank');
      }
    } else {
      pre = e;
    }
  }

  const addHistory = (add = true) => {
    const arr = states.filter((it, idx) => idx <= cursor);
    setStates([...arr, {bars: [...bars], folder: folder, page: {...page}}])
    if (add) {
      setCursor(() => cursor + 1);
    }
  }

  useEffect(() => {
    if (data?.data) {
      const obj = {};
      const files = data?.data.map(it => ({
        title: <Tooltip placement="bottom" title={it?.name}>
          {it?.name}
        </Tooltip>,
        value: it?.folder ? `f-${it.id}` : it.id,
        avatar: (
          <Avatar
            size={32}
            shape="square"
            src={getImage(it)}
          />
        )
      }))

      data?.data.forEach(it => obj[it?.folder ? `f-${it.id}` : it.id] = it);
      setFileList(files);
      setFiles({...files, ...obj});
    }
  }, [data]);

  useEffect(() => {
    setPage({...page, pageNumber: 1, folderId: folder})
  }, [folder])

  const jump = (item) => {
    addHistory();
    setBars(bars.filter(it => it.index <= item.index))
    setFolder(item.id);
  }

  const back = () => {
    if (cursor === -1) {
      return;
    }

    const {bars: b, folder: f, page: p} = states[cursor];

    if (cursor === states.length - 1 && b !== bars && f !== folder && p !== page) {
      addHistory(false);
    }

    console.log(states)

    setBars(b);
    setFolder(f);
    setPage(page);
    setCursor(cursor - 1);
  }

  const forward = () => {
    if (cursor === states.length - 1) {
      return;
    }
    const {bars: b, folder: f, page: p} = states[cursor + 1];
    setBars(b);
    setFolder(f);
    setPage(p);
    setCursor(cursor + 1);
  }

  const home = () => {
    jump({id: 0, index: -1});
  }

  const click = {
    'upload': () => {
      setDisplayUpload(true);
    },
    'refresh': () => {
      setPage({...page});
    },
    'select': () => {
      setSelection(!selection);
    },
    'mkdir': () => {
      setDisplayMkdir(true);
    }
  }

  const menuClick = (e) => {
    click[e.key]();
  }

  return (
    <>
      <UploadModal display={displayUpload}
                   folderId={folder}
                   onComplete={click['refresh']}
                   onClose={() => setDisplayUpload(false)}/>
      <MkdirModal display={displayMkdir}
                  folderId={folder}
                  onFinish={click['refresh']}
                  onClose={() => setDisplayMkdir(false)}/>
      <NavigationBar home={home} back={back} forward={forward} bars={bars} jump={jump}>
        {!selection && <Button onClick={() => setDisplayUpload(true)}
                               type="default" icon={<CloudUploadOutlined/>}
                               size={"large"}/>}
        {!selection && <Button onClick={() => setDisplayMkdir(true)}
                               type="default" icon={<FolderAddOutlined/>}
                               size={"large"}/>}
        {!selection && <Button onClick={() => click['refresh']()}
                               type="default" icon={<ReloadOutlined/>}
                               size={"large"}/>}
        {selection && <Button type="primary" icon={<DeleteOutlined/>} danger
                              size={"large"}/>}
        {selection && <Button type="default" icon={<CloseOutlined />} onClick={() => click['select']()}
                              danger
                              size={"large"}/>}
      </NavigationBar>
      <Dropdown
        style={{paddingBottom: 50}}
        menu={{items: menu, onClick: menuClick}}
        trigger={['contextMenu']}
      >
        <CheckCard.Group
          multiple={selection}
          style={{marginTop: 10, userSelect: 'none'}}
          onChange={openFile}
          size={"small"}
          options={fileList}/>
      </Dropdown>
      <Pagination current={page.pageNumber}
                  pageSize={page.pageSize}
                  total={data?.total}
                  onChange={p => setPage({...page, pageNumber: p})}/>
      {
        selection && <FloatButton.Group shape="circle" style={{right: 24}}>
          <FloatButton type={'primary'} icon={<DeleteOutlined/>}/>
          <FloatButton onClick={() => setSelection(false)} icon={<CloseOutlined/>}/>
        </FloatButton.Group>
      }
    </>
  );
}

export default FileList;
