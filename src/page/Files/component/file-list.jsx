import React, {useEffect, useState} from 'react';
import {CheckCard} from "@ant-design/pro-components";
import {Avatar, Dropdown, Pagination} from "antd";
import useRequest from "../../../hooks/useRequest.js";
import {getFilePage} from "../../../api/file.js";
import {getImage} from "../../../util/fileImageUtil.js";
import NavigationBar from "./navigation-bar.jsx";
import {DeleteOutlined, ReloadOutlined, SelectOutlined} from "@ant-design/icons";

let pre = undefined;

const menu = [
  {
    label: <span><ReloadOutlined /> 刷新</span>,
    key: '1',
  },
  {
    label: <span><DeleteOutlined /> 删除</span>,
    key: '2',
  },
  {
    label: <span><SelectOutlined /> 选择</span>,
    key: '3',
  },
]

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
  const {data, loading} = useRequest(() => getFilePage(page), [page], {});
  const [fileList, setFileList] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
  }, [bars]);

  const openFile = e => {
    if (e === undefined) {
      if (files[pre]?.folder) {
        addHistory();
        setFolder(pre.split('-')[1]);
        setBars([...bars, {...files[pre], index: bars.length}]);
      }
    } else {
      pre = e;
    }
  }

  const addHistory = (add = true) => {
    setStates([...states, {bars: [...bars], folder: folder, page: {...page}}])
    if (add) {
      setCursor(() => cursor + 1);
    }
  }

  useEffect(() => {
    if (data?.data) {
      const obj = {};
      const files = data?.data.map(it => ({
        title: <span>
          {it?.name}
        </span>,
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

    const {bars, folder: f, page} = states[cursor];

    if (f !== folder) {
      addHistory(false);
    }

    setBars(bars);
    setFolder(f);
    setPage(page);
    setCursor(cursor - 1);
  }

  const forward = () => {
    if (cursor === states.length - 1) {
      return;
    }
    const {bars, folder, page} = states[cursor + 1];
    setBars(bars);
    setFolder(folder);
    setPage(page);
    setCursor(cursor + 1);
  }

  const home = () => {
    jump({id: 0, index: -1});
  }

  return (
    <>
      <NavigationBar home={home} back={back} forward={forward} bars={bars} jump={jump}/>
      <Dropdown
        menu={{items: menu}}
        trigger={['contextMenu']}
      >
        <CheckCard.Group
          style={{marginTop: 10, userSelect: 'none'}}
          onChange={openFile}
          size={"small"}
          options={fileList}/>
      </Dropdown>
      <Pagination current={page.pageNumber}
                  pageSize={page.pageSize}
                  total={data?.total}
                  onChange={p => setPage({...page, pageNumber: p})}/>
    </>
  );
}

export default FileList;
