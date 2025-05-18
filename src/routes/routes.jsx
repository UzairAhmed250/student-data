import React from 'react'
import Login from "../(auth)/pages/login/index"
import {auth} from "../configuration" 


function routes() {

    const authUser = auth.currentUser;
    

  return (
    <div>routes</div>
  )
}

export default routes