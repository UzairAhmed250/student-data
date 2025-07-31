import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../../../configuration";
import  { ArrowLeftOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";

function ForgetPasswordComponent() {
const [email, setEmail] = useState("")
const navigate = useNavigate();
console.log(email)

const forgetPassword = async(e) => {
  e.preventDefault()
  try {
     await sendPasswordResetEmail(auth, email, {
      url: "https://student-data-omega.vercel.app/",
      handleCodeInApp: false
    });
    toast.success("Reset Email sent!");
    setEmail("")
  } catch (error) {
   console.log(error, "Erro sendding email") 
  }
}

const handleBack = () => {
  navigate("/");
}

useEffect(() => {
  console.log(email);
}, [email]);

  return (
    <div className="login-container">
      <div className="login-form">
        <button 
          type="button" 
          onClick={handleBack}
          className="back-button"
          style={{
            position: 'absolute',
            top: '35px',
            left: '20px',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#000',
            padding: '5px 10px'
          }}
          >
          <ArrowLeftOutlined />
        </button>
        <form onSubmit={forgetPassword}>
          <h2>Forget Password</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              required
            />
          </div>
          <button 
            type="submit" 
            >
            Send Email
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ForgetPasswordComponent;
