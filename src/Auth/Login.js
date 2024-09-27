import axios from "axios";
import React, { useState } from "react";
import Url from "../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";

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
      .post(`${Url}/api/users/login`, formData)
      .then((response) => {
        if (response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          toast.success("Đăng nhập thành công!", {
            position: "top-right",
            autoClose: 3000,
            transition: Slide,
          });
          setTimeout(() => {
            if (response.data.role == "ADMIN") {
              window.location.href = "/admin";
            }
            if (response.data.role == "TENANT") {
              window.location.href = "/tenant";
            }
            if (response.data.role == "LANDLORD") {
              window.location.href = "/landlord";
            }
          }, 3000);
        } else {
          toast.error("Tên đăng nhập hoặc mật khẩu không đúng!", {
            position: "top-right",
            autoClose: 3000,
            transition: Slide,
          });
        }
      })
      .catch((error) => {
        toast.error("Tên đăng nhập hoặc mật khẩu không đúng!", {
          position: "top-right",
          autoClose: 3000,
          transition: Slide,
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container col-6">
        <h2 className="text-center">Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <label className="mb-2">Tên đăng nhập:</label>
          <input
            className="form-control"
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handelInputChange}
          />
          <br />
          <label className="mb-2">Mật khẩu:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handelInputChange}
          />
          <br />
          <input className="btn btn-primary" type="submit" value="Đăng nhập" />
        </form>
      </div>
    </>
  );
};

export default Login;
