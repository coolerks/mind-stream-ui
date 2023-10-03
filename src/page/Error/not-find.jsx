import React from 'react';
import {Button, Result, Space} from 'antd';
import {useNavigate} from "react-router-dom";

const NotFind = () => {
  const navigate = useNavigate();
  return <Result
    status="404"
    title="404"
    subTitle="资源不存在."
    extra={
      <Space>
        <Button type="primary" onClick={() => navigate("/")}>返回主页</Button>
        <Button type="primary" onClick={() => navigate(-1)}>返回上一页</Button>
      </Space>
    }
  />
}


export default NotFind;
