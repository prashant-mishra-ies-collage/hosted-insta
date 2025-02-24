
import insta from "../assets/insta.svg";
import React,{useContext} from 'react'
import '../css/Navbar.css'
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";



export default function Navbar(login) {
  const navigate=useNavigate();

  const{setModalOpen}=useContext(LoginContext)

const loginStatus=()=>{
const token=localStorage.getItem("jwt")
if(login=== true|| token){
  return[
    <>
    <li>
 <NavLink to="/profile">Profile</NavLink>
</li>
<li>
 <NavLink to="/createpost">Create Post</NavLink>
</li>
<li>
  <NavLink to="/myfollowing">MyFollowing</NavLink>
</li>
<NavLink to={""}><button className="primarybtn" onClick={()=>setModalOpen(true)}>Log Out</button></NavLink>
    </>
  ]
}else{
  return[
    <>
      
<li>
 <NavLink to="/signup">Signup</NavLink>
</li>
<li>
 <NavLink to="/signin">SignIn</NavLink>
</li>
    </>
  ]
}
};

const loginStatusMobile=()=>{
 
    const token=localStorage.getItem("jwt")
    if(login=== true|| token){
      return[
        <>
<li>
  <NavLink to="/"> <span class="material-symbols-outlined">
home
</span>
</NavLink>
</li>

        <li>
     <NavLink to="/profile"><span class="material-symbols-outlined">
account_circle
</span>
</NavLink>
    </li>
    <li>
     <NavLink to="/createpost"><span class="material-symbols-outlined">
add_box
</span></NavLink>
    </li>
    <li>
      <NavLink to="/myfollowing"><span class="material-symbols-outlined">
explore
</span>
</NavLink>
    </li>
    <NavLink to="" onClick={() => setModalOpen(true)}>
      <span className="material-symbols-outlined">logout</span>
    </NavLink>
        </>
      ]
    }else{
      return[
        <>
          
    <li>
     <NavLink to="/signup">Signup</NavLink>
    </li>
    <li>
     <NavLink to="/signin">SignIn</NavLink>
    </li>
        </>
      ]
    }
}

  return (

    <div className='navbar'>
        <img id="insta-logo" src={insta} alt="" onClick={()=>{navigate("/")}} />
      <ul className="nav-menu">
     { loginStatus()}
 </ul>
 <ul className="nav-mobile">{loginStatusMobile()}</ul>
    </div>
  )
}
