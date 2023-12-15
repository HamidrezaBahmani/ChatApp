import React, { useContext, useState } from "react";
import Img from "./../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleImageUpload = async () => {
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, img);

    try {
      await uploadTask;

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: downloadURL,
        }),
      });

      setImg(null);
      setText("");
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      // Handle errors and display a user-friendly notification
      setErr(true);
      setLoading(false);
    }
  };

  const handleTextMessageSend = async () => {
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      setText("");
      setLoading(false);
    } catch (error) {
      console.error("Error updating Firestore:", error.message);
      // Handle Firestore update errors and display a user-friendly notification
      setErr(true);
      setLoading(false);
    }
  };

  const handleSend = async () => {
    setLoading(true);

    if (img) {
      await handleImageUpload();
    } else {
      await handleTextMessageSend();
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Input;
