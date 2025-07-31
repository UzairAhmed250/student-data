import React from 'react'
import HeaderComponent from './header'
import FooterComponent from './footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </div>
  )
}
