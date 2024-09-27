import axios from "axios";
import React, { useContext, useState } from "react";
import Url from "../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const [data, setData] = useState({});
  const { setUser } = useContext(UserContext);
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
          setUser({
            username: response.data.username,
            img: response.data.img,
            id: response.data.id,
            role: response.data.role,
          });
          //
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("img", response.data.img);
          localStorage.setItem("role", response.data.role);
          //
          toast.success("Đăng nhập thành công!", {
            position: "top-right",
            autoClose: 3000,
            transition: Slide,
          });
          console.log(setUser);
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
