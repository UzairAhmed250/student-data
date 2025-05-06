import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom';

function SignUpComponent() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Sign Up</h2>

        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" placeholder="Confirm your password" required />
        </div>

        <div className="checkbox-container">
          <div className="checkbox-left">
            <input type="checkbox" id='terms' name='terms' required />
            <p>I agree to the <Link to="/terms">Terms & Conditions</Link></p>
          </div>
          <div className="checkbox-right">
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpComponent;
