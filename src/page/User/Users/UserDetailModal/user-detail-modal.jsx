import React, {useState} from 'react';
import {SafetyOutlined, TeamOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
import {Modal, Segmented} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {closeUserDetailModel} from "../../../../store/user/userSlice.js";
import UserRoleDetail from "./component/user-role-detail.jsx";
import UserDetail from "./component/user-detail.jsx";

const options = [
  {
    label: '详情信息',
    value: 'detail',
    icon: <UnorderedListOutlined/>
  },
  {
    label: '所属角色',
    value: 'role',
    icon: <TeamOutlined />
  }
]

const content = {
  'detail': <UserDetail/>,
  'role': <UserRoleDetail/>
}

function UserDetailModal(props) {
  const dispatch = useDispatch();
  const {id, display} = useSelector(state => state.user.userDetail);
  const [key, setKey] = useState("detail");
  return (
    <>
      <Modal title="用户详情"
             open={display}
             onCancel={() => dispatch(closeUserDetailModel())}
             footer={null}>
        <Segmented onChange={(k) => setKey(k)}
                   defaultValue={'detail'} block options={options}/>
        {content[key]}
      </Modal>
    </>
  );
}

export default UserDetailModal;
