import React, {useState} from 'react';
import {Popconfirm, Space, Table} from "antd";
import useRequest from "../../../../../hooks/useRequest.js";
import {deleteUserRole, getUserRolePage} from "../../../../../api/account.js";
import {useDispatch, useSelector} from "react-redux";
import {openRoleDetailModal} from "../../../../../store/role/roleSlice.js";
import RoleDetailModal from "../../../Role/component/RoleDetailModal/RoleDetailModal.jsx";

const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }
]

function UserRoleDetail(props) {
  const {id, display} = useSelector(state => state.user.userDetail);
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    pageNumber: 1,
    pageSize: 10
  });
  const {data, loading} = useRequest(() => getUserRolePage(id, page), [page, display, id]);
  async function removeUserRole(roleId) {
    await deleteUserRole(id, roleId);
    if (data?.firstPage || data?.data.length > 1) {
      setPage({...page});
    } else {
      setPage({...page, pageNumber: page.pageNumber - 1});
    }
  }
  const operation = {
    title: '操作',
    key: 'operation',
    render: (_, record) => (
      <Popconfirm
        title="移除用户"
        description="将在此角色下移除该用户?"
        okText="是"
        cancelText="否"
        onConfirm={async e => await removeUserRole(record.roleId)}
      >
        <a>移除</a>
      </Popconfirm>
    ),
  };
  return (
    <>
      <RoleDetailModal />
      <Table
        rowKey={'roleId'}
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

export default UserRoleDetail;
