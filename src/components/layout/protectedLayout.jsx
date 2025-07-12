import React from 'react'
import { Outlet } from 'react-router-dom'
import Sider from './sider'

export default function ProtectedLayout() {
  return (
    <div style={{display: "flex"}}>
        <Sider />
        <Outlet />
    </div>
  )
}
