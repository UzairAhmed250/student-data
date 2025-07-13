import React, { useState } from 'react';
import {
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';


const items = [
  { key: '1', icon: <UsergroupAddOutlined />, label: <Link to="/student/create"> Add Student </Link>},
  { key: '2', icon: <EditOutlined />, label: <Link to="/student/edit/:studentid">Edit Student </Link> },
  { key: '3', icon: <UserOutlined />, label: <Link to="/student/create">Student Detail </Link> },
  { key: '4', icon: <UserOutlined />, label: <Link to="/StudentTable">View Student Detail </Link> },
//   { key: '5', icon: <ContainerOutlined />, label: 'Option 3' },

];
const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: collapsed ? 8 : 256 , background: "white", transition: "0.3s"}}>
      <div 
        style={{
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // height: 64, // adjust if needed
          width: "100% !important",
          background: "white",
          // borderBottom: "1px solid #f0f0f0"
        }}
      >

      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 0 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        style={{height: "100vh", padding: 0, margin: 0,}}
      />
    </div>
  );
};
export default Sider;