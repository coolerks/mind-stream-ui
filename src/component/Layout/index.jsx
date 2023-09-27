import {DefaultFooter, PageContainer, ProCard, ProLayout} from '@ant-design/pro-components';
import {useEffect, useRef, useState} from 'react';
import route from '../../route'
import defaultProps from './_defaultProps';
import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import {Dropdown} from "antd";
import {
  CommentOutlined,
  DashboardOutlined, ExperimentOutlined,
  FileTextOutlined,
  FormOutlined,
  LogoutOutlined, SettingOutlined,
  SmileFilled, SnippetsOutlined,
  UnorderedListOutlined, UserOutlined
} from "@ant-design/icons";
import Loading from "../Loading/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchMenus} from "../../store/menu/menuSlice.js";
import {fetchUserInfo} from "../../store/user/userSlice.js";


const IconMap = {
  Dashboard: <DashboardOutlined/>,
  Unordered: <UnorderedListOutlined/>,
  SmileFilled: <SmileFilled/>,
  Form: <FormOutlined/>,
  FileText: <FileTextOutlined/>,
  Comment: <CommentOutlined/>,
  Snippets: <SnippetsOutlined/>,
  User: <UserOutlined/>,
  Experiment: <ExperimentOutlined/>,
  Setting: <SettingOutlined/>,
};

const loopMenuItem = (menus) =>
  menus.map(({icon, routes, ...item}) => {
    const m = {
      ...item,
      icon: IconMap[icon],
      children: routes && loopMenuItem(routes),
    };
    if (!m.icon) {
      delete m['icon'];
    }
    return m;
  });

export default (props) => {
  const settings = {
    fixSiderbar: true,
    layout: 'top',
    splitMenus: true,
  };
  const navigate = useNavigate();
  const element = useRoutes(route);
  const location = useLocation();
  const loading = useSelector(state => state.loading.value.isLoading);
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu.menus)
  const actionRef = useRef();
  const userInfo = useSelector(state => state.user.userInfo);
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  useEffect(() => {
    setPathname(() => location.pathname)
  }, [location])

  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchUserInfo());
  }, [])

  useEffect(() => {
    actionRef.current.reload();
  }, [menu]);


  const [pathname, setPathname] = useState('/');

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        title={'Mind Stream'}
        {...defaultProps}
        location={{pathname}}
        menu={{request: async () => loopMenuItem(menu), type: "group"}}
        actionRef={actionRef}
        avatarProps={{
          src: userInfo.avatar,
          size: 'small',
          title: userInfo.nickname,
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined/>,
                      label: '退出登录',
                      onClick: logout
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        footerRender={props => (<DefaultFooter
          copyright="MindStream"
        />)}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              navigate(item.path);
            }}
          >
            {dom}
          </div>
        )}
        headerTitleRender={(logo, title, _) => {
          const defaultDom = (
            <>
              <a
                onClick={() => {
                  console.log('titheaderTitle clicked');
                }}
              >
                {loading ? <Loading/> : logo}
                {/*{logo}*/}
                {title}
              </a>
            </>
          );
          if (
            typeof document === 'undefined' ||
            document.body.clientWidth < 1400
          ) {
            return defaultDom;
          }
          if (_.isMobile) return defaultDom;
          return (
            <>
              {defaultDom}
            </>
          );
        }}
        {...settings}
      >
        {element}
        {/*<PageContainer>*/}
        {/*  <ProCard*/}
        {/*    style={{*/}
        {/*      height: '100vh',*/}
        {/*      minHeight: 800,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {element}*/}
        {/*  </ProCard>*/}
        {/*</PageContainer>*/}
      </ProLayout>
    </div>
  );
};
