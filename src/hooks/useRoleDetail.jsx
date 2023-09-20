import {useSelector} from "react-redux";
import useRequest from "./useRequest.js";
import {getRoleDetail} from "../api/role.js";
import React, {useEffect, useState} from "react";
import {Tag} from "antd";

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
  const {data: role, loading} = useRequest(() => getRoleDetail(id), [id, display])
  const [roleInfo, setRoleInfo] = useState([]);

  useEffect(() => {
    const {createBy: user} = role;
    role['status'] = role['status'] === 1 ? <Tag color="cyan">启用</Tag> : <Tag color="red">禁用</Tag>;
    const arr = []
    for (let roleKey in role) {
      if (roleMap[roleKey]) {
        arr.push({key: roleKey, name: roleMap[roleKey], info: role[roleKey]})
      }
    }
    arr.push({
      key: 'user',
      name: '创建者',
      info: <>
        <span>{user?.email} - {user?.nickname}</span>
      </>
    })
    setRoleInfo([...arr])
  }, [role]);

  return {
    roleInfo, loading
  }
}
