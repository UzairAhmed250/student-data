import React, { useState } from 'react';
import "./signup.css";
import { Link } from 'react-router-dom';
import { auth, sendEmailVerification, createUserWithEmailAndPassword, updateProfile, db, addDoc, collection } from '../../../../configuration';
import { toast, ToastContainer } from 'react-toastify';

function SignUpComponent() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    isChecked: false
  })
  
  const handleChecked = (e) => {
    setUser({
      ...user,
      isChecked: e.target.checked
    })
  }

  const handleOnchange = (e) => {
  setUser({
    ...user,
  [e.target.name]:e.target.value
})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    if (user.password !== user.cPassword ) {
      toast.error("Your confirm password does not match the password.");
      return;
    }
    if(!user.isChecked){
      toast.error("Please agree to the Terms & Conditions.")
      return;
    }
try {
  const userCred = await createUserWithEmailAndPassword(auth, user.email, user.password)
  const registeredUser = userCred.user;
  
  await updateProfile(auth.currentUser, {
    displayName: user.name
  })

  await sendEmailVerification(registeredUser, {
    url: "https://student-data-omega.vercel.app/",
    handleCodeInApp: false,
  });
  const storeUsers = await addDoc(collection(db, "users"),{
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber || null,
          photoURL: user.photoURL,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          createdAt: new Date(),
  })
  
  console.log(storeUsers)
  toast.success("Email Verification sent!")
} catch (error) {
  if(error){
    toast.error(error.code)
  }
  const errorCode = error.code;
  const errorMessage = error?.message
  console.log(errorCode, "errorCode", errorMessage, "errorMessage")
  
}
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
            <input 
              onChange={handleChecked}
              checked={user.isChecked}
              type="checkbox" 
              id='terms' 
              name='terms' 
              required 
              />
            <p className='agreement'>I agree to the <Link to="/terms">Terms & Conditions</Link></p>
          </div>
          <div className="checkbox-right">
            <Link to="/">Already have an account?</Link>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUpComponent;
