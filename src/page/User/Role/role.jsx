import React, {useRef} from 'react';
import {ProTable} from '@ant-design/pro-components';
import {Button, message, Popconfirm, Tooltip} from 'antd'
import columns from "./component/columns.jsx";
import {proTableRequest} from "../common/proTableRequest.js";
import {deleteRole, getRoleList} from "../../../api/role.js";
import RoleDetailModal from "./component/RoleDetailModal/RoleDetailModal.jsx";
import {useDispatch} from "react-redux";
import {
  displayAssignMenusModal,
  displayAssignPermissionModal,
  openRoleDetailModal
} from "../../../store/role/roleSlice.js";
import RoleEditModal from "./component/RoleEditModal/role-edit-modal.jsx";
import AssignPermissionsModal from "./component/AssignPermissionsModal/assign-permissions-modal.jsx";
import AssignMenusModal from "./component/AssignMenusModal/assign-menus-modal.jsx";
import {DeleteOutlined, EyeOutlined, MenuFoldOutlined, SafetyOutlined} from "@ant-design/icons";


function Role(props) {
  const actionRef = useRef();
  const dispatch = useDispatch();
  const removeRole = async (id) => {
    await deleteRole(id);
    message.success('删除成功')
    actionRef?.current.reload();
  }

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
      <Tooltip key="view" placement="bottom" title={'查看详情'}>
        <Button
          size={"small"}
          onClick={() => {
            dispatch(openRoleDetailModal(record.id));
          }}
          icon={<EyeOutlined/>}/>
      </Tooltip>,
      <Tooltip key={'assign-permission'} placement="bottom" title={'分配权限'}>
        <Button
          size={"small"}
          icon={<SafetyOutlined/>}
          onClick={() => {
            dispatch(displayAssignPermissionModal(record.id))
          }}/>
      </Tooltip>,
      <Tooltip key={'assign-menus'} placement="bottom" title={'管理菜单'}>
        <Button
          icon={<MenuFoldOutlined/>}
          size={"small"}
          onClick={() => {
            dispatch(displayAssignMenusModal(record.id))
          }}/>
      </Tooltip>,
      <Popconfirm
        title="删除角色"
        description="确定删除此角色?"
        onConfirm={() => removeRole(record.id)}
        okText="是"
        cancelText="否"
        key={'delete'}
      >
        <Tooltip placement="bottom" title={'删除'}>
          <Button danger size={"small"} key={'delete'} icon={<DeleteOutlined/>}/>
        </Tooltip>
      </Popconfirm>
    ],
  }

  return (
    <>
      <RoleDetailModal/>
      <AssignPermissionsModal/>
      <AssignMenusModal/>
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
