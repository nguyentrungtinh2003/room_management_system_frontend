import React, { useState } from "react";
import axios from "axios";
import Url from "../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    img: null,
    phoneNumber: "",
    citizenIdentification: "",
    address: "",
    role: "TENANT",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);
    form.append("email", formData.email);
    form.append("img", formData.img);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("citizenIdentification", formData.citizenIdentification);
    form.append("address", formData.address);
    form.append("role", formData.role);

    axios
      .post(`${Url}/api/users/register`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTcyNzQwNDY4OSwiZXhwIjoxNzI3NDkxMDg5fQ.ni2X77KqepvOZ2V5cd5a4bU9T2yiawWTP-VSozmMfQJdQPjVmnKKXLp334cYJq29`,
        },
      })
      .then((response) => {
        toast.success("Đăng ký thành công!", {
          position: "top-right",
          autoClose: 3000,
          transition: Slide,
        });
      })
      .catch((error) => {
        toast.error("Đăng ký thất bại. Vui lòng thử lại.", {
          position: "top-right",
          autoClose: 3000,
          transition: Slide,
        });
      });
  };

  return (
    <div className="container mt-5 col-md-6">
      <ToastContainer />
      <h2 className="text-center mb-4">Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ảnh đại diện</label>
          <input
            type="file"
            className="form-control"
            name="img"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CMND/CCCD</label>
          <input
            type="text"
            className="form-control"
            name="citizenIdentification"
            value={formData.citizenIdentification}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Vai trò</label>
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="TENANT">Người thuê</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
