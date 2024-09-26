import axios from "axios";
import React, { useState } from "react";
import Url from "../Config/Url";

const Login = () => {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${Url}/api/users/login`, formData, {
        headers: {
          Authorization: `Bearer `,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Login fail !");
      });
  };

  return (
    <>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <label>Tên đăng nhập:</label>
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handelInputChange}
        />
        <br />
        <label>Mật khẩu:</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handelInputChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <h2>{data.username}</h2>
    </>
  );
};

export default Login;
