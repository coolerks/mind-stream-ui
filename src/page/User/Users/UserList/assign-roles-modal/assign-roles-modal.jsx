import React from 'react';
import {Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {closeAssignRoleModal} from "../../../../../store/user/userSlice.js";
import AssignRoles from "./assign-roles.jsx";

function AssignRolesModal(props) {
  const {id, display} = useSelector(state => state.user.assignRole);
  const dispatch = useDispatch();
  return (
    <>
      <Modal title="分配角色"
             centered={true}
             open={display}
             onCancel={() => dispatch(closeAssignRoleModal())}
             footer={null}>
        <div style={{height: '80vh', overflow: "auto"}}>
          <AssignRoles />
        </div>
      </Modal>
    </>
  );
}

export default AssignRolesModal;
