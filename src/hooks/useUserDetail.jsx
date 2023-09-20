import {useSelector} from "react-redux";
import useRequest from "./useRequest.js";
import React, {useEffect, useState} from "react";
import {getAccountDetail} from "../api/account.js";
import {Avatar, Tag} from "antd";


const roleMap = {
  "id": "编号",
  "nickname": "昵称",
  "avatar": "头像",
  "gender": "性别",
  "sign": "签名",
  "createTime": "创建时间",
  "updateTime": "更新时间",
  "email": "邮箱",
  "username": "用户名",
  "loginTimes": "登录次数",
  "status": "状态",
  "lastLoginIp": "最后登录IP",
  "createIp": "创建者IP",
  "lastLoginTime": "最后登录时间"
}

export default function useUserDetail() {
  const {id, display} = useSelector(state => state.user.userDetail);
  const {data: user, loading} = useRequest(() => getAccountDetail(id), [id, display])
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    const arr = []
    user['gender'] = user['gender'] ? '男' : '女';
    user['status'] = user['status'] === 1 ? <Tag color="cyan">启用</Tag> : <Tag color="red">禁用</Tag>;
    user['avatar'] = <Avatar src={user['avatar']}/>;

    for (let userKey in user) {
      if (roleMap[userKey]) {
        arr.push({key: userKey, name: roleMap[userKey], info: user[userKey]})
      }
    }
    setUserDetail([...arr])
  }, [user]);

  return {
    userDetail, loading
  }
}
