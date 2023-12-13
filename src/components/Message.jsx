import React from "react";
import woman from "../img/woman.jpg";
const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src={woman} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src={woman} alt="" />
      </div>
    </div>
  );
};

export default Message;
