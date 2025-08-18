import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  db,
  doc,
  getDoc,
  setDoc,
} from "../../../../configuration";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
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

  const passwordType = isPasswordVisible ? "text" : "password";

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

    await setPersistence(
      auth,
      users.isChecked ? browserLocalPersistence : browserSessionPersistence
    );
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
      setIsLoader(true);
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
    } finally {
      setIsLoader(false);
    }
  };

  const handleGoogleAuthentication = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // const scope = provider.addScope(
      //   "https://www.googleapis.com/auth/contacts.readonly"
      // );

      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("token: ", token);

      // if (token) {
      //   const response = await fetch(
      //     "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses",
      //     {
      //       headers: { Authorization: `Bearer ${token}` },
      //     }
      //   );

      //   const data = await response.json();
      //   console.log("Contacts:", data);
      // }

      const user = result.user;
      console.log("user:", user);
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber || null,
          photoURL: user.photoURL,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          createdAt: new Date(),
        });
        console.log("User added to Firestore ✅");
      } else {
        await setDoc(
          userRef,
          {
            lastSignInTime: user.metadata.lastSignInTime,
          },
          { merge: true }
        );
        console.log("User already exists, updated login time ✅");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
      // console.log("email: ", email)
      console.log("credential: ", credential);
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
        <div className="form-group" style={{ position: "relative" }}>
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

          {users.password.length > 0 && (
            <button
              type="button"
              onClick={() => setPasswordVisible(!isPasswordVisible)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                color: "purple",
                cursor: "pointer",
                fontSize: "16px",
                border: "none",
              }}
            >
              {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </button>
          )}
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
        <div style={{ margin: "0 auto", width: "150px" }}>
          <Button
            type="submit"
            style={{ width: "100%", cursor: isLoader && "not-allowed" }}
            disabled={isLoader}
            onClick={handleLoginSubmit}
            children={
              <>
                {isLoader && (
                  <LoadingOutlined
                    style={{ marginRight: 8, fontSize: "17px" }}
                  />
                )}{" "}
                Login
              </>
            }
          />
        </div>
        <hr
          style={{
            margin: "20px 0",
            border: "1px solid purple",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            border: "1px solid black",
            width: "50%",
            padding: "20px 25px",
            margin: "10px auto",
            cursor: "pointer",
          }}
          onClick={handleGoogleAuthentication}
        >
          <GoogleOutlined className="bg-color" />
          <p>Continue with Google</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
