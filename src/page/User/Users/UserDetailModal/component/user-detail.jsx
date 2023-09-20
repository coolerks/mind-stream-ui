import React from 'react';
import {Table} from "antd";
import useUserDetail from "../../../../../hooks/useUserDetail.jsx";


const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '信息',
    dataIndex: 'info',
    key: 'info'
  }
];

function UserDetail(props) {
  const {loading, userDetail} = useUserDetail();
  return (
    <>
      <Table
        showHeader={false}
        pagination={false}
        columns={columns}
        loading={loading}
        dataSource={userDetail}/>
    </>
  );
}

export default UserDetail;
