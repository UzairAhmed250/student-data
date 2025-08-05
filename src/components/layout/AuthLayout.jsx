import React from 'react'
import HeaderComponent from './header'
import FooterComponent from './footer'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

export default function Layout() {
  const {isAuthenticated, loading} = useAuth()

  if(loading) return <p style={{display:"flex", alignItems:"center", justifyContent: "center"}}>Loaing...</p>

  if(isAuthenticated) return <Navigate to="/studentTable" replace />

  return (
    <div>
      <HeaderComponent />
        <Outlet />
      <FooterComponent />
    </div>
  )
}
