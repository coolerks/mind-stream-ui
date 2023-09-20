import React, {useState} from 'react';
import {Modal, Segmented} from "antd";
import {SafetyOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {closeRoleDetailModal} from "../../../../../store/role/roleSlice.js";
import RoleDetail from "./component/role-detail.jsx";
import RolePermissions from "./component/role-permissions.jsx";
import RoleUserList from "./component/role-user-list.jsx";

const options = [
  {
    label: '详情信息',
    value: 'detail',
    icon: <UnorderedListOutlined/>
  },
  {
    label: '权限信息',
    value: 'permission',
    icon: <SafetyOutlined />
  },
  {
    label: '用户列表',
    value: 'userList',
    icon: <UserOutlined />
  }
]

const content = {
  'detail': <RoleDetail />,
  'permission': <RolePermissions />,
  'userList': <RoleUserList />
}

function RoleDetailModal(props) {
  const {display} = useSelector(state => state.role.roleDetail);
  const dispatch = useDispatch();
  const [key, setKey] = useState('detail');
  return (
    <>
      <Modal title="角色详情"
             open={display}
             onCancel={() => dispatch(closeRoleDetailModal())}
             footer={null}>
        <Segmented onChange={(k) => setKey(k)}
                   defaultValue={'detail'} block options={options}/>
        {content[key]}
      </Modal>
    </>
  );
}

export default RoleDetailModal;
