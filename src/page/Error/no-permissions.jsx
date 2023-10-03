import React from 'react';
import {Button, Result, Space} from 'antd';
import {useNavigate} from "react-router-dom";

const NoPermissions = () => {
  const navigate = useNavigate();
  return <Result
    status="403"
    title="403"
    subTitle="没有权限."
    extra={
      <Space>
        <Button type="primary" onClick={() => navigate("/")}>返回主页</Button>
        <Button type="primary" onClick={() => navigate(-1)}>返回上一页</Button>
      </Space>
    }
  />
}


export default NoPermissions;
