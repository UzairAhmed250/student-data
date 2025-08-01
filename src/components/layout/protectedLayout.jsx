import React from 'react';
import { Outlet } from 'react-router-dom';
import Sider from './sider';
import ProtectedHeader from '../protectedheader';

export default function ProtectedLayout() {
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
