import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../configuration";
import { LoadingOutlined } from "@ant-design/icons";

function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    email: "",
    password: "",
    isChecked: false,
  });
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberEmail");
    const storedPassword = localStorage.getItem("rememberPassword");
    const storedChecked = localStorage.getItem("isChecked");

    if (storedChecked === "true") {
      setUsers({
        email: storedEmail || "",
        password: storedPassword || "",
        isChecked: true,
      });
    }
  }, []);

  const handleChecked = (e) => {
    setUsers({
      ...users,
      isChecked: e.target.checked,
    });
  };

  const handleOnChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (users.isChecked) {
      localStorage.setItem("rememberEmail", users.email);
      localStorage.setItem("rememberPassword", users.password);
      localStorage.setItem("isChecked", true);
    } else {
      localStorage.removeItem("rememberEmail");
      localStorage.removeItem("rememberPassword");
      localStorage.removeItem("isChecked");
    }
    try {
      setIsLoader(true)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        users.email,
        users.password
      );
      const user = userCredential.user;
      console.log(user);
      navigate("/studenttable");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    } finally{
      setIsLoader(false)
    }
  };
  // console.log(users)

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleOnChange}
            value={users.email}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleOnChange}
            value={users.password}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="checkbox-container">
          <div className="checkbox-left">
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              onChange={handleChecked}
              checked={users.isChecked}
              required
            />
            <p>Remember me</p>
          </div>
          <div className="checkbox-right">
            <Link to={"/forgetpassword"}>Forget Password?</Link>
          </div>
        </div>
        <div className="checkbox-right">
          <span>
            Don't have an account? <Link to="/signup">Create New Account</Link>
          </span>
        </div>
        <div style={{margin: "0 auto", width: "150px"}}>
          <button 
            type="submit" 
            onClick={handleLoginSubmit} 
            style={{width: "100%", cursor: isLoader && "not-allowed" }}
            disabled={isLoader}
            >
            {isLoader && <LoadingOutlined style={{marginRight: 8 ,color: "purple"}} /> } 
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
