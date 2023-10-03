import React from 'react';
import {Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {closeAssignPermissionModal} from "../../../../../store/role/roleSlice.js";
import AssignPermission from "./component/assign-permission.jsx";

function AssignPermissionsModal(props) {
  const {id, display} = useSelector(state => state.role.assignPermissions);
  const dispatch = useDispatch();
  return (
    <>
      <Modal title="分配权限"
             width={800}
             centered={true}
             open={display}
             onCancel={() => dispatch(closeAssignPermissionModal())}
             footer={null}>
        <div style={{height: '80vh', overflow: "auto"}}>
          <AssignPermission/>
        </div>
      </Modal>
    </>
  );
}

export default AssignPermissionsModal;
