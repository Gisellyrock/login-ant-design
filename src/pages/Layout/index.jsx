import { TeamOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PageLayout() {
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const pageForm = <Link to="/form">Form</Link>;
  const pageTable = <Link to="/table">Table</Link>;
  const logout = (
    <Link to="/" onClick={logOut}>
      Logout
    </Link>
  );

  const items = [
    getItem(pageForm, 0, <UserOutlined />),
    getItem(pageTable, 0, <TeamOutlined />),
    getItem(logout, 0, <LogoutOutlined />),
  ];

  function logOut() {
    localStorage.clear;
    window.location.href = '/';
  }

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Welcome to the Users System!
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          {' '}
          Departamento de Tecnologia e Inovação - DIT/PC
        </Footer>
      </Layout>
    </Layout>
  );
}
