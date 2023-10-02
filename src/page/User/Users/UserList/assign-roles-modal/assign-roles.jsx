import React, {useEffect, useState} from 'react';
import {Skeleton, Transfer, message} from 'antd';
import useRequest from "../../../../../hooks/useRequest.js";
import {useSelector} from "react-redux";
import {addUserRoles, getAllRoles, getUserRoleIds} from "../../../../../api/role.js";
import {deleteUserRoleBatch} from "../../../../../api/account.js";

const AssignRoles = () => {
  const {id, display} = useSelector(state => state.user.assignRole);
  const {data: roleKeys, loading: keysLoading} = useRequest(() => getUserRoleIds(id), [id, display], []);
  const {data: roles, loading: rolesLoading} = useRequest(() => getAllRoles(), [], []);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setKeys(() => roleKeys);
  }, [roleKeys]);

  const onChange = async (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    const data = {userId: id, roleIds: moveKeys};
    setLoading(true);
    const time = new Date().getTime();
    try {
      if (direction === 'right') {
        await addUserRoles(data);
        setKeys([...keys, ...moveKeys]);
        message.success('修改成功');
      } else {
        await deleteUserRoleBatch(data);
        setKeys(keys.filter(it => !moveKeys.includes(it)));
        message.success('修改成功');
      }
    } catch (e) {
    } finally {
      const now = new Date().getTime();
      setTimeout(() => {
        setLoading(false);
      }, now - time < 500 ? 500 : 1)
    }

  };
  return (
    <>
      {
        (keysLoading || rolesLoading)
          ? <Skeleton active/> :
          <Transfer
            disabled={loading}
            style={{height: '100%'}}
            titles={['可分配角色', '已分配角色']}
            dataSource={roles.map(it => ({key: it?.id, title: it?.name}))}
            targetKeys={keys}
            onChange={onChange}
            render={(item) => item.title}
            pagination={{pageSize: 100000}}
          />
      }
    </>
  );
};
export default AssignRoles;
