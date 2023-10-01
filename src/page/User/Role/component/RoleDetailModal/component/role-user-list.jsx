import React, {useState} from 'react';
import {Avatar, Popconfirm, Space, Table} from "antd";
import UserDetailModal from "../../../../Users/UserDetailModal/user-detail-modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import useRequest from "../../../../../../hooks/useRequest.js";
import {deleteUserRole, getRoleUserPage} from "../../../../../../api/account.js";
import {Await} from "react-router-dom";

const columns = [
  {
    title: '用户',
    key: 'name',
    render: (_, record) => (
      <Space size={"middle"}>
        <Avatar src={record?.avatar}/>
        <span>{record?.nickname}</span>
      </Space>
    )
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }
]

function RoleUserList(props) {
  const {id, display} = useSelector(state => state.role.roleDetail);
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    pageNumber: 1,
    pageSize: 10
  });

  const {data, loading} = useRequest(() => getRoleUserPage(id, page), [page, display, id]);
  async function removeUserRole(userId) {
    await deleteUserRole(userId, id);
    if (data?.firstPage || data?.data.length > 1) {
      setPage({...page});
    } else {
      // todo 待测试
      setPage({...page, pageNumber: page.pageNumber - 1});
    }
  }
  const operation = {
    title: '操作',
    key: 'operation',
    render: (_, record) => (
      <Space size="middle">
        <Popconfirm
          title="移除用户"
          description="将在此角色下移除该用户?"
          okText="是"
          cancelText="否"
          onConfirm={async e => await removeUserRole(record.id)}
        >
          <a>移除</a>
        </Popconfirm>
      </Space>
    )
  }


  return (
    <>
      <UserDetailModal/>
      <Table
        rowKey={'id'}
        pagination={{
          current: page.pageNumber,
          pageSize: page.pageSize,
          total: data.total,
          onChange: p => setPage(() => ({...page, pageNumber: p}))
        }}
        loading={loading}
        dataSource={data?.data}
        columns={[...columns, operation]}/>
    </>
  );
}

export default RoleUserList;
