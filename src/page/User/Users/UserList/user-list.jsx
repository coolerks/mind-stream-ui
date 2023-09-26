import React, {useRef} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button} from 'antd';
import {getAccountList} from "../../../../api/account.js";
import columns from "./component/Columns.jsx";
import {proTableRequest} from "../../common/proTableRequest.js";
import {useDispatch} from "react-redux";
import {displayUserDetailModel} from "../../../../store/user/userSlice.js";
import UserDetailModal from "../UserDetailModal/user-detail-modal.jsx";
import UserEditModal from "./UserEditModal/user-edit-modal.jsx";


function UserList(props) {
  const actionRef = useRef();
  const dispatch = useDispatch();
  const operations = {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <UserEditModal actionRef={actionRef} userId={record.id} update={true} key={'add'}/>,
      <a onClick={() => dispatch(displayUserDetailModel(record.id))}
         rel="noopener noreferrer"
         key="view">
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
  };
  return (
    <>
      <UserDetailModal/>
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
