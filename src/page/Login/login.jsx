import {LockOutlined, MobileOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProConfigProvider, ProFormCaptcha, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import {useState} from 'react';
import {login} from "../../api/account.js";
import {useNavigate} from "react-router-dom";



const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default () => {
  const navigate = useNavigate();
  const onFinish = async (v) => {
    const data = await login(v);
    localStorage.setItem('token', data);
    message.success('登录成功');
    navigate('/');
    return true;
  }
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr")',
      backgroundSize: 'cover'
    }}>

      <ProConfigProvider hashed={false}>
        <div>
          <LoginForm
            logo="https://blog.integer.top/avatar"
            title="MindStream"
            onFinish={onFinish}
          >
            <div style={{
              marginBlockStart: 24
            }}>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'用户名或邮箱'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};
