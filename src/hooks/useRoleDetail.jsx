import {useSelector} from "react-redux";
import {getRoleDetail} from "../api/role.js";
import React from "react";
import {Tag} from "antd";
import useDetail from "./useDetail.jsx";

const roleMap = {
  "id": "编号",
  "name": "名称",
  "description": "描述信息",
  "createTime": "创建时间",
  "updateTime": "更新时间",
  "status": "状态",
}

export default function useRoleDetail() {
  const {id, display} = useSelector(state => state.role.roleDetail);
  const {detail, loading} = useDetail({
    request: () => getRoleDetail(id),
    deps: [id, display],
    resultMap: roleMap,
    dataParse: (role) => role['status'] = role['status'] === 1 ? <Tag color="cyan">启用</Tag> :
      <Tag color="red">禁用</Tag>,
    onParseComplete: (role, arr) => {
      const {createBy: user} = role;
      arr.push({
        key: 'user',
        name: '创建者',
        info: <>
          <span>{user?.email} - {user?.nickname}</span>
        </>
      })
    }
  });

  return {
    detail, loading
  }
}
