import React from "react";
import woman from "../img/woman.jpg";
const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="userChat">
        <img src={woman} alt="woman" />
        <div className="userchatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
