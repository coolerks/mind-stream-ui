import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Space, theme, Tooltip, Transfer, Tree} from 'antd';
import {useSelector} from "react-redux";
import useRequest from "../../../../../../hooks/useRequest.js";
import {addRoleMenus, getAddedMenuKeys, getAllMenus, removeRoleMenus} from "../../../../../../api/menu.js";
// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => selectedKeys.includes(eventKey);
const generateTree = (treeNodes = [], checkedKeys = []) =>
  treeNodes.map(({children, ...props}) => ({
    ...props,
    disabled: checkedKeys.includes(props.key),
    children: generateTree(children, checkedKeys),
  }));
const TreeTransfer = ({dataSource, targetKeys, ...restProps}) => {
  const {token} = theme.useToken();
  const transferDataSource = [];

  function flatten(list = [], parent = "") {
    list.forEach((item) => {
      item.fullName = parent === '' ? item?.name : `${parent}/${item?.name}`
      item.title = <Tooltip placement="bottom" title={item.fullName}>{item.name}</Tooltip>;
      transferDataSource.push(item);
      item.key = item.id;
      item.children = flatten(item.routes, item.fullName);
    });
    return list;
  }

  flatten(dataSource);

  function renderOwnedMenu(item) {
    console.log(item)
    if (item?.parentId !== "0" && !targetKeys.includes(item?.parentId)) {
      return <Tooltip placement="bottom" title={'父菜单没有被添加，当前菜单及其子菜单将不会进行展示'}>
        <span style={{color: '#ff4d4f'}}>{item.fullName}</span>
      </Tooltip>
    }
    return <span>{item.fullName}</span>
  }

  return (
    <Transfer
      {...restProps}
      render={item => renderOwnedMenu(item)}
      style={{height: '100%'}}
      titles={['全部菜单', '已有菜单']}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      showSelectAll={false}
    >
      {({direction, onItemSelect, selectedKeys}) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <div
              style={{
                padding: token.paddingXS,
              }}
            >
              <Tree
                blockNode
                checkable
                checkStrictly
                defaultExpandAll
                checkedKeys={checkedKeys}
                treeData={generateTree(dataSource, targetKeys)}
                onCheck={(_, {node: {key}}) => {
                  onItemSelect(key, !isChecked(checkedKeys, key));
                }}
                onSelect={(_, {node: {key}}) => {
                  onItemSelect(key, !isChecked(checkedKeys, key));
                }}
              />
            </div>
          );
        }
      }}
    </Transfer>
  );
};

const AssignMenus = () => {
  const {id, display} = useSelector(state => state.role.assignMenus);
  const {data: menuKeys, loading: menuKeysLoading} = useRequest(() => getAddedMenuKeys(id), [id, display], []);
  const {data: menus, loading: menusLoading} = useRequest(() => getAllMenus(), [], []);
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    setKeys(menuKeys);
  }, [menuKeys]);
  const onChange = async (newTargetKeys, direction, moveKeys) => {

    const data = {roleId: id, menuIds: moveKeys};
    setLoading(true);
    const time = new Date().getTime();
    try {
      if (direction === 'right') {
        await addRoleMenus(data);
        setKeys([...keys, ...moveKeys]);
        message.success('修改成功');
      } else {
        await removeRoleMenus(data);
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
    <TreeTransfer
      disabled={loading || menusLoading || menuKeysLoading}
      dataSource={menus}
      targetKeys={keys}
      onChange={onChange}/>
  )
};
export default AssignMenus;
