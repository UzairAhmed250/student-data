import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, setPersistence, inMemoryPersistence, signInWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence } from "../../../../configuration";
import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import Button from "../../../customComponent/uiButtton/button";

function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    email: "",
    password: "",
    isChecked: false,
  });
  const [isLoader, setIsLoader] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const passwordType = isPasswordVisible ?  "text" : "password";
    

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

    await setPersistence(auth, 
      users.isChecked ? browserLocalPersistence :
      browserSessionPersistence)
    // if (users.isChecked) {
    //   localStorage.setItem("rememberEmail", users.email);
    //   localStorage.setItem("rememberPassword", users.password);
    //   localStorage.setItem("isChecked", true);
    // } else {
    //   localStorage.removeItem("rememberEmail");
    //   localStorage.removeItem("rememberPassword");
    //   localStorage.removeItem("isChecked");
    // }
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
        <div className="form-group" style={{position: "relative"}}>
          <label htmlFor="password">Password:</label>
          <input
            type={passwordType}
            id="password"
            name="password"
            onChange={handleOnChange}
            value={users.password}
            placeholder="Enter your password"
            required
          />

          { users.password.length > 0 && (<button 
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)} 
            style={{
                position: "absolute",
                right: "10px",
                top:"38px",
                color: "purple",
                cursor: "pointer",
                fontSize:"16px",
                border: "none"
              }}
            >
            {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </button>)}
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
          <Button
            type="submit"
            style={{width: "100%", cursor: isLoader && "not-allowed" }}
            disabled={isLoader}
            onClick={handleLoginSubmit} 
            children={
              <>
                {isLoader && <LoadingOutlined style={{marginRight: 8 , fontSize: "17px"}} /> } Login
              </>
            }
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
