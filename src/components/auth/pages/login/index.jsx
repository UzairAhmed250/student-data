import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

function LoginComponent() {
  return (
    <div className="login-container">
    <form className="login-form">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password" required />
      </div>
      <div className="checkbox-container">
  <div className="checkbox-left">
    <input type="checkbox" id='checkbox' name='checkbox' />
    <p>Remember me</p>
  </div>
  <div className="checkbox-right">
    <Link to={"/forgetpassword"}>Forget Password?</Link>
  </div>
</div>
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default LoginComponent