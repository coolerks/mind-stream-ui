import React, {useRef} from 'react';
import {ProTable} from '@ant-design/pro-components';
import {getAccountList} from "../../../../api/account.js";
import columns from "./component/Columns.jsx";
import {proTableRequest} from "../../common/proTableRequest.js";
import {useDispatch} from "react-redux";
import {displayAssignRoleModal, displayUserDetailModel} from "../../../../store/user/userSlice.js";
import UserDetailModal from "../UserDetailModal/user-detail-modal.jsx";
import UserEditModal from "./UserEditModal/user-edit-modal.jsx";
import AssignRolesModal from "./assign-roles-modal/assign-roles-modal.jsx";
import {Button, Tooltip} from "antd";
import {EyeOutlined, UsergroupAddOutlined} from "@ant-design/icons";


function UserList(props) {
  const actionRef = useRef();
  const dispatch = useDispatch();
  const operations = {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <UserEditModal actionRef={actionRef} userId={record.id} update={true} key={'add'}/>,
      <Tooltip key="view" placement="bottom" title={'查看详情'}>
        <Button
          key="view"
          size={"small"}
          onClick={() => dispatch(displayUserDetailModel(record.id))}
          icon={<EyeOutlined/>}/>
      </Tooltip>,
      <Tooltip key={'assign-role'} placement="bottom" title={'分配角色'}>
        <Button
          icon={<UsergroupAddOutlined/>}
          size={"small"}
          onClick={() => dispatch(displayAssignRoleModal(record.id))} />
      </Tooltip>
    ],
  };
  return (
    <>
      <UserDetailModal/>
      <AssignRolesModal/>
      <ProTable
        columns={[...columns, operations]}
        actionRef={actionRef}
        request={proTableRequest(getAccountList)}
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
        headerTitle="用户列表"
        toolBarRender={() => [
          <UserEditModal actionRef={actionRef} key={'add'}/>
        ]}
      />
    </>
  )
}

export default UserList;
