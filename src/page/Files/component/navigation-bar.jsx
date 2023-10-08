import React from 'react';
import {Space} from "antd";
import {ArrowLeftOutlined, ArrowRightOutlined, CaretRightOutlined, HomeOutlined} from "@ant-design/icons";
import BarItem from "./bar-item.jsx";

function NavigationBar({bars, jump, back, forward, home}) {
  return (
    <>
      <Space>
        <Space style={{border: '1px solid #d9d9d9', padding: 10, borderRadius: '5px'}}>
          <BarItem onClick={back}>
            <ArrowLeftOutlined/>
          </BarItem>
          <BarItem onClick={forward}>
            <ArrowRightOutlined/>
          </BarItem>
        </Space>
        <Space split={<CaretRightOutlined/>} style={{border: '1px solid #d9d9d9', padding: 10, borderRadius: '5px'}}>
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
