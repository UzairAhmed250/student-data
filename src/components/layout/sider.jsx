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
  { key: '1', icon: <UsergroupAddOutlined />, label: 'Add Student', Link: "/StudentTable"   },
  { key: '2', icon: <EditOutlined />, label: 'Edit Student' },
  { key: '3', icon: <UserOutlined />, label: 'Student Detail' },
  { key: '4', icon: <UserOutlined />, label: 'View Student Detail' },
//   { key: '5', icon: <ContainerOutlined />, label: 'Option 3' },

];
const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div style={{ width: 256 ,}}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default Sider;