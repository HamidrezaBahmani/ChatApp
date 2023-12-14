import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // This effect runs whenever `user` is updated
    console.log("Updated user:", user);
  }, [user]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        setUser(data);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (e) => {
    //check wether the group (chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log({ combinedId });
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log({ res });
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chats
        try {
          console.log("before update currentUser ");
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          console.log("after update currentUser ");
          console.log("before update user ");
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          console.log("after update user ");
        } catch (error) {
          console.error("Error updating userChats:", error);
        }
      }
    } catch (err) {
      console.log({ err });
    }

    setUser(null);
    setUsername("");

    //create user chats
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not Found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userchatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
