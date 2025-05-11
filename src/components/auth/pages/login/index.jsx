import React, { useState } from 'react'
import "./style.css"
import { Link , useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../configuration';

function LoginComponent() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    email: "",
    password: "",
  })

  const handleOnChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]:e.target.value
    })
  }

  console.log(users.name, "usersname")

    const handleLoginSubmit = async(e) => {
      e.preventDefault()

      await signInWithEmailAndPassword(auth, users.email, users.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/studenttable")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      })
    }
    // console.log(users)

  return (
    <div className="login-container">
    <form className="login-form">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name='email' onChange={handleOnChange} value={users.email} placeholder="Enter your email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name='password' onChange={handleOnChange} value={users.password} placeholder="Enter your password" required />
      </div>
      <div className="checkbox-container">
  <div className="checkbox-left">
    <input type="checkbox" id='checkbox' name='checkbox' required />
    <p>Remember me</p>
  </div>
  <div className="checkbox-right">
    <Link to={"/forgetpassword"}>Forget Password?</Link>
  </div>
</div>
          <div className="checkbox-right">
            <span>Don't have an account? <Link to="/Signup">Create New Account</Link></span>
          </div>
      <button type="submit" onClick={handleLoginSubmit}>Login</button>
    </form>
  </div>
  )
}

export default LoginComponent