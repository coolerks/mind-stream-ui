import React from 'react';
import {Table} from "antd";

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

function Detail({loading, detail}) {
  return (
    <>
      <Table
        showHeader={false}
        pagination={false}
        columns={columns}
        loading={loading}
        dataSource={detail}/>
    </>
  );
}

export default Detail;
