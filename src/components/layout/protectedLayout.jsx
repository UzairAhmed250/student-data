import React from 'react';
import {Navigate, Outlet } from 'react-router-dom';
import Sider from './sider';
import ProtectedHeader from '../protectedheader';
import { useAuth } from '../../context/authContext';

export default function ProtectedLayout() {
  const {isAuthenticated, loading} = useAuth()

  if(loading) return <p style={{display:"flex", alignItems:"center", justifyContent: "center"}}>Loaing...</p>

  if(!isAuthenticated) return <Navigate to="/" replace/>

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sider />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ProtectedHeader />
        <div style={{ flex: 1, overflowY: 'scroll', padding: '16px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
