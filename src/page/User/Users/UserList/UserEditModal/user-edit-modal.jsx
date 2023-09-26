import React, {useState} from 'react';
import {ModalForm} from "@ant-design/pro-components";
import {Button, Form, Input, Radio, Switch} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {addAccount, getAccountDetail, updateAccount} from "../../../../../api/account.js";

function UserEditModal({actionRef, update = false, userId}) {
  const [form] = Form.useForm();
  const [display, setDisplay] = useState(false);

  async function submit(v) {
    v.status = v.status ? 1 : 0;
    v.gender = v.gender === '1';
    if (update) {
      console.log(v);
      v.id = userId;
      await updateAccount(v);
    } else {
      await addAccount(v);
    }
    actionRef.current.reload();
    return true;
  }

  return (
    <>
      <ModalForm
        onFinish={submit}
        request={async () => {
          if (update) {
            const data = await getAccountDetail(userId);
            data.status = data.status === 1;
            data.gender = data.gender ? '1' : '0';
            return data;
          }
          return {status: true, gender: '1'};
        }}
        width={500}
        title={update ? '修改用户' : "新增用户"}
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
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
      >
        {
          !update && <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: '请输入邮箱!',
              },
              {
                min: 6,
                max: 30,
                message: '邮箱需大于6个字符并且小于30个字符！'
              },
              {
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: '请输入正确的邮箱'
              }
            ]}
          >
            <Input/>
          </Form.Item>
        }
        {
          !update && <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
              {
                min: 6,
                max: 20,
                message: '用户名需大于6个字符并且小于20个字符！'
              }
            ]}
          >
            <Input/>
          </Form.Item>
        }
        <Form.Item
          label="昵称"
          name="nickname"
          rules={[
            {
              required: true,
              message: '请输入昵称!',
            },
            {
              min: 1,
              max: 16,
              message: '昵称需大于1个字符并且小于16个字符！'
            }
          ]}
        >
          <Input/>
        </Form.Item>
        {
          update && <Switch
            style={{marginBottom: 10}}
            checked={display}
            checkedChildren="修改密码"
            unCheckedChildren="不修改密码"
            onChange={() => setDisplay(!display)}
          />
        }
        {
          display && <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
              {
                min: 6,
                max: 20,
                message: '密码需大于6个字符并且小于20个字符！'
              }
            ]}
          >
            <Input.Password/>
          </Form.Item>
        }
        {
          display && <Form.Item
            label="确认密码"
            name="password2"
            dependencies={['password']}
            rules={[
              {
                required: true,
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不匹配!'));
                },
              }),
            ]}
          >
            <Input.Password/>
          </Form.Item>
        }

        <Form.Item label="性别" name={'gender'}>
          <Radio.Group>
            <Radio value="1"> 男 </Radio>
            <Radio value="0"> 女 </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="status" label='状态' valuePropName="checked">
          <Switch/>
        </Form.Item>

        <Form.Item
          name="sign"
          label="个性签名"
          rules={[
            {
              required: true,
              message: '请输入个性签名！'
            }
          ]}
        >
          <Input.TextArea showCount maxLength={255}/>
        </Form.Item>
      </ModalForm>
    </>
  );
}

export default UserEditModal;
