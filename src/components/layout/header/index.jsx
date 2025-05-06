import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom';

function HeaderComponent() {
    return (
      <div className="header-container">
        <div>
          <h2 className="header-title">StudentDetail</h2>
        </div>
        <div className="nav-buttons">
          <div>
            <button><Link to={"/"}> Home </Link></button>
          </div>
          <div>
            <button>Contact us</button>
          </div>
        </div>
      </div>
    );
  }
  

export default HeaderComponent