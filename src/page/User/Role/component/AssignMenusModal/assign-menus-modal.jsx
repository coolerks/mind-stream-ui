import React from 'react';
import {Modal} from "antd";
import {closeAssignMenusModal} from "../../../../../store/role/roleSlice.js";
import AssignMenus from "./component/assign-menus.jsx";
import {useDispatch, useSelector} from "react-redux";

function AssignMenusModal(props) {
  const {display} = useSelector(state => state.role.assignMenus);
  const dispatch = useDispatch();
  return (
    <>
      <Modal title="管理菜单"
             width={800}
             centered={true}
             open={display}
             onCancel={() => dispatch(closeAssignMenusModal())}
             footer={null}>
        <div style={{height: '80vh', overflow: "auto"}}>
          <AssignMenus />
        </div>
      </Modal>
    </>
  );
}

export default AssignMenusModal;
