import * as firebase from "firebase/app";
import "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useGlobalContext } from "./context";
import firebaseConfig from "./firebase.config";
import logo from './images/logo.svg';


const Navbar = () => {
  const{openSubmenu,openSidebar} = useGlobalContext();
  const displaySubmenu = (e) => {
   const text=e.target.textContent; //get the text of the nav text
   const tempBtn=e.target.getBoundingClientRect() //get the coordinates of the nav text
   const center=(tempBtn.left+tempBtn.right)/2 //submenu will be at the center of the nav text
   const bottom=tempBtn.bottom-3;//submenu will be 3px bellow of the nav text 
    openSubmenu(text,{center,bottom})
  }
  
  const {isLoggedIn,setIsLoggedIn}=useGlobalContext()
  if(firebase.getApp.length===0){
    firebase.initializeApp(firebaseConfig);
  }
    const provider = new GoogleAuthProvider();
    const handleSignIn=()=>{
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            const {displayName,email} = result.user;
            const loggedUser={name:displayName,email}
            setIsLoggedIn(loggedUser)
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode,errorMessage,credential)
          });
    }
   const handleLogout =()=>{
    setIsLoggedIn(false);
   }
  return (
    <nav className="nav">
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" className='nav-logo' />
          <button className="btn toggle-btn" onClick={openSidebar}><FaBars/></button>
        </div>
        <ul className="nav-links">
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>products</button>
          </li>
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>developers</button>
          </li>
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>company</button>
          </li>
        </ul>
      
        {isLoggedIn?<button className="btn signin-btn" onClick={handleLogout}>Log Out  {isLoggedIn.name}</button>:<button className="btn signin-btn" onClick={handleSignIn}>Log In</button>}
      </div>
    </nav>
  )
}

export default Navbar
