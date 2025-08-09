import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../../configuration';
import { UserOutlined, LogoutOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons';
import './style.css';
import { useAuth } from '../../context/authContext';

export default function ProtectedHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false)
  const navigate = useNavigate();
  const {loading, user} = useAuth()

  const handleLogout = async () => {
    setIsLoader(true);
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally{
        setIsLoader(false)
    }
  };



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="protected-header">
        <div className="header-right">
          <div className="user-dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <UserOutlined className="user-icon" />
              <span className="user-name">
                {loading ? <LoadingOutlined /> : user?.displayName || user?.email }
              </span>
              <DownOutlined className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item">
                   <UserOutlined />
                  <span>Profile</span>
                </div>
                <div className="dropdown-item logout-item" onClick={handleLogout}>
                {isLoader ? <LoadingOutlined /> :<LogoutOutlined />}
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
