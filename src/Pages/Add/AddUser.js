import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Url from "../../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";
const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    img: null,
    phoneNumber: "",
    citizenIdentification: "",
    address: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("username", formData.username);
    userData.append("password", formData.password);
    userData.append("email", formData.email);
    userData.append("img", formData.img);
    userData.append("phoneNumber", formData.phoneNumber);
    userData.append("citizenIdentification", formData.citizenIdentification);
    userData.append("address", formData.address);
    userData.append("role", formData.role);

    try {
      await axios.post(`${Url}/api/users/register`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Tạo người dùng thành công !", {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 3000);
    } catch (error) {
      console.error("There was an error registering the user!", error);
      toast.error("Tạo người dùng thất bại !", {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4">Thêm người dùng</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber" className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formCitizenId" className="mb-3">
              <Form.Label>CMND/CCCD</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter citizen ID"
                name="citizenIdentification"
                value={formData.citizenIdentification}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Vai trò</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Chọn</option>
                <option value="TENANT">Người thuê</option>
                <option value="LANDLORD">Chủ trọ</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formImg" className="mb-3">
              <Form.Label>Hình</Form.Label>
              <Form.Control
                type="file"
                name="img"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          <i className="fas fa-check"></i> Thêm
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
