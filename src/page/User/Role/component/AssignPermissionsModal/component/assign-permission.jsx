import React, {useEffect, useState} from 'react';
import difference from 'lodash/difference';
import {message, Table, Transfer} from 'antd';
import {useSelector} from "react-redux";
import useRequest from "../../../../../../hooks/useRequest.js";

import {
  addRolePermissions,
  getAllPermissions,
  getRolePermissionsIds,
  removeRolePermissions
} from "../../../../../../api/permission.js";

const TableTransfer = ({ leftColumns, loading, rightColumns, ...restProps }) => (
  <Transfer rowKey={r => r?.id} {...restProps}>
    {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          rowKey={'id'}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{pointerEvents: listDisabled ? 'none' : undefined}}
          loading={loading}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const leftTableColumns = [
  {
    dataIndex: 'name',
    title: '名称',
  },
  {
    dataIndex: 'description',
    title: '描述',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'name',
    title: '名称',
  },
  {
    dataIndex: 'description',
    title: '描述',
  }
];
const App = () => {
  const {id, display} = useSelector(state => state.role.assignPermissions);
  const {data: permissionKeys, loading: permissionKeysLoading} = useRequest(() => getRolePermissionsIds(id), [id, display], []);
  const {data: permissions, loading: permissionsLoading} = useRequest(() => getAllPermissions(), [], []);
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    setKeys(permissionKeys);
  }, [permissionKeys]);


  const onChange = async (newTargetKeys, direction, moveKeys) => {
    const data = {roleId: id, permissionIds: moveKeys};
    setLoading(true);
    const time = new Date().getTime();
    try {
      if (direction === 'right') {
        await addRolePermissions(data);
        setKeys([...keys, ...moveKeys]);
        message.success('修改成功');
      } else {
        await removeRolePermissions(data);
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
      <TableTransfer
        style={{height: '100%'}}
        dataSource={permissions}
        targetKeys={keys}
        disabled={permissionsLoading || permissionKeysLoading || loading}
        showSearch={true}
        onChange={onChange}
        loading={permissionsLoading || permissionKeysLoading || loading}
        titles={['可分配权限', '已分配权限']}
        filterOption={(inputValue, item) =>
          item.name.includes(inputValue) || item.description.includes(inputValue)
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </>
  );
};
export default App;
