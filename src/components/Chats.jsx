import React from "react";
import woman from "../img/woman.jpg";
const Chats = () => {
  return (
    <div className="chats">
      <div className="userChat">
        <img src={woman} alt="woman" />
        <div className="userchatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={woman} alt="woman" />
        <div className="userchatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
