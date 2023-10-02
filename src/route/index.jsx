import {DashboardOutlined, FormOutlined, SmileFilled, UnorderedListOutlined} from "@ant-design/icons";
import First from "../page/First";
import Second from "../page/Second/index.jsx";
import Third from "../page/Third/index.jsx";
import {Navigate} from "react-router-dom";
import User from "../page/User/index.jsx";
import UserList from "../page/User/Users/UserList/user-list.jsx";
import Role from "../page/User/Role/role.jsx";
import Login from "../page/Login/login.jsx";
import Permissions from "../page/User/Permissions/permissions.jsx";

export default [
  {
    path: '/dashboard',
    name: '仪表盘',
    icon: <DashboardOutlined/>,
    element: <Third/>
  },
  {
    path: '/article',
    name: '文章',
    icon: <UnorderedListOutlined/>,
    element: <First/>,
    children: [
      {
        index: true,
        element: <Navigate to={'list'}/>
      },
      {
        path: 'list',
        name: '全部文章',
        icon: <FormOutlined/>,
        element: <Second/>
      },
      {
        path: '*',
        name: '全部文章',
        icon: <SmileFilled/>,
        element: <Second/>
      }
    ]
  },
  {
    path: '/comment',
    name: '评论',
    icon: <SmileFilled/>,
    element: <First/>
  },
  {
    path: '/file',
    name: '附件',
    icon: <SmileFilled/>,
    element: <First/>
  },
  {
    path: '/users',
    name: '用户',
    icon: <SmileFilled/>,
    element: <User/>,
    children: [
      {
        path: 'list',
        name: '全部用户',
        element: <UserList/>
      },
      {
        path: 'role',
        name: '全部角色',
        element: <Role/>
      },
      {
        path: 'permission',
        name: '权限管理',
        element: <Permissions/>
      }
    ]
  },
  {
    path: '/theme',
    name: '主题',
    icon: <SmileFilled/>,
    element: <First/>
  },
  {
    path: '/manager',
    name: '管理',
    icon: <SmileFilled/>,
    element: <First/>
  },
  {
    path: '/login',
    name: '登录',
    hidden: true,
    element: <Login/>
  },
  {
    path: '*',
    name: '404',
    hidden: true,
    icon: <SmileFilled/>,
    element: <First/>
  }
]
