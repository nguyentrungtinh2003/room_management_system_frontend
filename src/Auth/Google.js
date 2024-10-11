// src/Login.js
import React from "react";
import Url from "../Config/Url";

const Google = () => {
  const handleLogin = () => {
    window.open(`${Url}/oauth2/authorization/google`, "_self");
  };

  return (
    <div>
      <h1>Login with Google</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Google;
