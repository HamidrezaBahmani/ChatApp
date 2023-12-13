import React from "react";
import woman from "../img/woman.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Demo Chat</span>
      <div className="user">
        <img src={woman} alt="woman" />
        <span>John</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
