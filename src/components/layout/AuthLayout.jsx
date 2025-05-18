import React from 'react'
import HeaderComponent from './header'
import FooterComponent from './footer'
import { Outlet } from 'react-router-dom'
// import Login from '../../(auth)/pages/login'

export default function Layout() {
  return (
    <div>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </div>
  )
}
