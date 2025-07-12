import React from 'react'
import LoginComponent from '../../../components/auth/pages/login'
// import { auth } from "../../../configuration"
// import { useNavigate } from 'react-router-dom'

function Login() {
//  const navigate = useNavigate()
//   const user = auth.currentUser;
  
//     if(!user){
//       navigate("./");
//     }
//     else{
//       navigate("/studenttable")
//     }
    return (
    <>
        <LoginComponent />
    </>
  )
}

export default Login