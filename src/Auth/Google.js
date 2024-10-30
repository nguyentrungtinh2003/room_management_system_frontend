// src/Login.js
import React, { useEffect } from "react";
import Url from "../Config/Url";
import { useLocation } from "react-router-dom";

const Google = () => {
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    localStorage.setItem("email", email);
  }, [location]);

  return (
    <div>
      <h1>Login with Google</h1>
      <a href={`${Url}/oauth2/authorization/google`}>Login with Google</a>
    </div>
  );
};

export default Google;
