import React from 'react';
import {Button, Space} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CaretRightOutlined,
  CloudUploadOutlined, FolderAddOutlined,
  HomeOutlined, ReloadOutlined
} from "@ant-design/icons";
import BarItem from "./bar-item.jsx";

function NavigationBar({bars, jump, back, forward, home, children}) {
  return (
    <>
      <Space>
        <Space style={{border: '1px solid #d9d9d9', backgroundColor: '#ffffff', padding: 10, borderRadius: '8px'}}>
          <BarItem onClick={back}>
            <ArrowLeftOutlined/>
          </BarItem>
          <BarItem onClick={forward}>
            <ArrowRightOutlined/>
          </BarItem>
        </Space>
        {children}
        <Space split={<CaretRightOutlined/>}
               style={{border: '1px solid #d9d9d9', backgroundColor: '#ffffff', padding: 10, borderRadius: '8px'}}>
          <BarItem onClick={home}>
            <HomeOutlined/>
          </BarItem>
          {bars.map(it => (<BarItem onClick={() => jump(it)} key={it.id}>{it.name}</BarItem>))}
        </Space>
      </Space>
    </>
  );
}

export default NavigationBar;
