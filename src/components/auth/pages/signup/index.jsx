import React, { useState } from 'react';
import "./signup.css";
import { Link, useNavigate  } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../configuration';

function SignUpComponent() {
  const navigate = useNavigate(); 
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  })

  const handleOnchange = (e) => {
  setUser({
    ...user,
  [e.target.name]:e.target.value
})
  }

  console.log(user.password, user.cPassword, "hi")



  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    if (user.password !== user.cPassword) {
      alert("Your confirm password does not match the password.");
      // return;
    }
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential)=> {
        const registeredUser  = userCredential.user;
        console.log(registeredUser )
        navigate("/") 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }

  return (
    <div className="signup-container" >
      <form className="login-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name='name' onChange={handleOnchange} value={user.name} placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name='email' onChange={handleOnchange} value={user.email} placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name='password' onChange={handleOnchange} value={user.password} placeholder="Enter your password" required />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name='cPassword' onChange={handleOnchange} value={user.cPassword} placeholder="Confirm your password" required />
        </div>

        <div className="checkbox-container">
          <div className="checkbox-left">
            <input type="checkbox" id='terms' name='terms' required />
            <p>I agree to the <Link to="/terms">Terms & Conditions</Link></p>
          </div>
          <div className="checkbox-right">
            <Link to="/">Already have an account?</Link>
          </div>
        </div>

        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpComponent;
