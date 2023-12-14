import React, { useContext } from "react";
import woman from "../img/woman.jpg";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className="message owner">
      {/* <div className="messageInfo">
        <img src={woman} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src={woman} alt="" />
      </div> */}
    </div>
  );
};

export default Message;
