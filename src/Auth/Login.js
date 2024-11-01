import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import Url from "../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Google from "./Google";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchGoogleUser = async () => {
      try {
        const response = await axios.get(`${Url}/api/users/success`, {
          withCredentials: true,
        });
        const { id, username, img, role } = response.data;

        // Lưu thông tin vào localStorage
        localStorage.setItem("id", id);
        localStorage.setItem("username", username);
        localStorage.setItem("img", img);
        localStorage.setItem("role", role);

        // Điều hướng dựa trên role
        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "TENANT") {
          navigate("/tenant");
        } else if (role === "LANDLORD") {
          navigate("/landlord");
        } else {
        }
      } catch (error) {
        console.log("Error fetching Google user data", error);
      }
    };

    fetchGoogleUser();
  }, [navigate]);

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
      <div className="container col-6 shadow-lg mt-5">
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
          <Button variant="primary" type="submit" className="m-2">
            Đăng nhập
          </Button>
          <Google />
          <a href="/forgot-password">
            <Button variant="primary" className="m-2">
              Quên mật khẩu
            </Button>
          </a>

          <div className="mt-2">
            <Link to="/register">
              <Button variant="secondary">Đăng ký</Button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
