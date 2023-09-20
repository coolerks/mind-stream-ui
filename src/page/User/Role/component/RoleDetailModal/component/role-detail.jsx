import React from 'react';
import {Table} from 'antd';
import useRoleDetail from "../../../../../../hooks/useRoleDetail.jsx";

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


function RoleDetail(props) {
  const {loading, roleInfo} = useRoleDetail();


  return (
    <>
      <Table
        showHeader={false}
        pagination={false}
        columns={columns}
        loading={loading}
        dataSource={roleInfo}/>
    </>
  );
}

export default RoleDetail;
