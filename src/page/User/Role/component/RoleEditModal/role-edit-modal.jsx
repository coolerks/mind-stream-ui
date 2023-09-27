import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Switch} from "antd";
import {ModalForm,} from '@ant-design/pro-components';
import {PlusOutlined} from "@ant-design/icons";
import {addRole, getRoleDetail, updateRole} from "../../../../../api/role.js";


function RoleEditModal({actionRef, update = false, roleId}) {
  const [form] = Form.useForm();
  async function submit(v) {
    console.log(v);
    v.status = v.status ? 1 : 0;
    if (update) {
      v.id = roleId;
      await updateRole(v);
    } else {
      await addRole(v);
    }
    actionRef.current.reload();
    return true;
  }

  async function getRole() {
    const data = await getRoleDetail(roleId);
    const {id, name, description, status} = data;
    return {id, name, description, status: status === 1};
  }


  return (
    <>
      <ModalForm
        request={async () => {
          if (update) {
            return await getRole();
          }
          return {status: true};
        }}
        width={500}
        title={update ? '修改角色' : "新增角色"}
        trigger={
          <span>
            {
              update ?
                <a type={'link'}>编辑</a>
                :
                <Button type="primary">
                  <PlusOutlined/>
                  新增
                </Button>

            }
          </span>
        }
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          // onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={submit}
      >
        <Form.Item
          label="角色名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入角色名称!',
            },
            {
              min: 1,
              max: 20,
              message: '角色名称需大于1个字符并且小于20个字符！'
            }
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="description"
          label="描述信息"
          rules={[
            {
              required: true,
              message: '请输入描述信息！'
            }
          ]}
        >
          <Input.TextArea showCount maxLength={255}/>
        </Form.Item>
        <Form.Item name="status" label='状态' valuePropName="checked">
          <Switch/>
        </Form.Item>
      </ModalForm>
    </>
  );
}

export default RoleEditModal;
