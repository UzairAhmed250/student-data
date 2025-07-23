import React, { useState } from "react";
import {
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, Divider } from "antd";
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    icon: <UsergroupAddOutlined />,
    label: <Link to="/student/create"> Add Student </Link>,
  },
  {
    key: "2",
    icon: <EditOutlined />,
    label: <Link to="/student/edit/:studentid">Edit Student </Link>,
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: <Link to="/student/create">Student Detail </Link>,
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: <Link to="/StudentTable">View Student Detail </Link>,
  },
];
const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const siderWidth = collapsed ? 80 : 350;

  return (
    <div
      style={{
        width: siderWidth,
        background: "purple",
        transition: "width 0.3s ease",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
          height: 64,
          background: "white",
          transition: "all 0.3s ease",
          padding: "0px 12px",
        }}
      >
        {!collapsed && (

        <p
          style={{
            // display: collapsed ? "none" : "flex",
            color: "purple",
            fontWeight: "500",
            fontSize: "24px",
            overflow: "hidden"
          }}
          >
          Student Detail
        </p>
        )}
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 0, transition: "all 0.3s ease"}}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        style={{height: "calc(100vh - 64px)" ,height: "100vh", padding: 0, margin: 0 }}
      >
        {items.map((item, idx) => (
          <React.Fragment key={item.key}>
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
            {idx !== items.length - 1 && (
              <Menu.Divider style={{ color: "purple", margin: 0 }} />
            )}
          </React.Fragment>
        ))}
      </Menu>
    </div>
  );
};
export default Sider;
