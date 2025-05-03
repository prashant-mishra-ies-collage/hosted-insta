import Navbar from "./component/Navbar";
import {BrowserRouter,Routes,Route}from "react-router-dom";
import React,{createContext,useState}from 'react';
import Home from "./screens/Home";
import Signup from "./component/Signup";
import Signin from "./component/Signin";
import Profile from "./screens/Profile";
import Createpost from "./screens/Createpost";

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "./context/LoginContext";
import Modal from "./component/Modal";
import UserProfile from "./component/UserProfile";
import MyFollowing from "./screens/MyFollowing";





export function App() {
 const [userLogin,setUserLogin]=useState(false)
 const [modal,setModalOpen]=useState(false)

  return (
    
    <BrowserRouter>
    <div className="app">
    
      <LoginContext.Provider value={{setUserLogin, setModalOpen}}>
<Navbar login={userLogin}/>
<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/signup" element={<Signup/>}></Route>
  <Route path="/signin" element={<Signin/>}></Route>
  <Route exact path="/profile" element={<Profile/>}></Route>
  <Route path="/createpost" element={<Createpost/>}></Route>
  <Route path="/profile/:userid" element={<UserProfile/>}></Route>
 <Route path="/myfollowing" element={<MyFollowing/>}></Route>
</Routes>
{modal && <Modal setModalOpen={setModalOpen}></Modal>}
      </LoginContext.Provider>
      
    
    </div>
    
    </BrowserRouter>

    
  )
}
