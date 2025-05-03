
import React, { useEffect, useState ,useContext} from "react";
import "../css/Signin.css";



import { NavLink,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { LoginContext } from "../context/LoginContext";


export default function Signin() {
const {setUserLogin}=useContext(LoginContext)

  const navigate = useNavigate()
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const notifyA = (msg) => toast.error(msg)
const notifyB = (msg) => toast.success(msg)

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const postData = () => {
  //checking email
  if (!emailRegex.test(email)) {
    notifyA("Invalid email")
    return
  } 

  // Sending data to server
  fetch("/signin", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      
      email: email,
      password: password

    })
  }).then(res => res.json())
  .then(data => {
    if (data.error) {
      notifyA(data.error)
    } else {
      notifyB("sign is uccessfully")
      console.log(data);
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      setUserLogin(true)
      navigate("/")
    }
    console.log(data)
  })
}


  return (
    <div className='signin'>
      <div>
    <div className='login-form'>
    <h1 className="signin">TrueZone</h1>
      <div>
      <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
      </div>
      <div>
      <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
      </div>
      <input type="submit" id='login-btn'value="Sign In" onClick={() => { postData() }}/>
     
</div>
<div className='loginform2'>
  Dont have an account ?
  <NavLink to="/signup">
<span>Sign up</span>
  </NavLink>

</div>
    </div>
    </div>
  )
}
