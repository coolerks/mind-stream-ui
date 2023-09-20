import React, {useRef} from 'react';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import columns from "./component/columns.jsx";
import {proTableRequest} from "../common/proTableRequest.js";
import {getRoleList} from "../../../api/role.js";
import RoleDetailModal from "./component/RoleDetailModal/RoleDetailModal.jsx";
import {useDispatch} from "react-redux";
import {openRoleDetailModal} from "../../../store/role/roleSlice.js";
import RoleEditModal from "./component/RoleEditModal/role-edit-modal.jsx";


function Role(props) {
  const actionRef = useRef();
  const dispatch = useDispatch();

  const operations = {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <RoleEditModal
        actionRef={actionRef}
        roleId={record.id}
        update={true}
        key={'edit'}/>,
      <a
        onClick={() => {
          dispatch(openRoleDetailModal(record.id));
        }}
        rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          {key: 'copy', name: '复制'},
          {key: 'delete', name: '删除'},
        ]}
      />,
    ],
  }

  return (
    <>
      <RoleDetailModal/>
      <ProTable
        columns={
          [...columns, operations]
        }
        actionRef={actionRef}
        request={proTableRequest(getRoleList)}
        cardBordered
        editable={{type: 'multiple'}}
        debounceTime={100}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{labelWidth: 'auto'}}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="角色列表"
        toolBarRender={() => [
          <RoleEditModal actionRef={actionRef} key={'add'}/>
        ]}
      />
    </>
  )
}

export default Role;
