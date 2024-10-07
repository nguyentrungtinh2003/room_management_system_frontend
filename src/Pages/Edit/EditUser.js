import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Url from "../../Config/Url";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";

const EditUser = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState("");
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

  useEffect(() => {
    // Fetch user by ID when component mounts
    const getUserById = async () => {
      try {
        const response = await axios.get(`${Url}/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data;
        setFormData({
          username: user.username,
          password: "", // Mật khẩu không nên tự động điền
          email: user.email,
          img: null, // Không điền giá trị hình ảnh
          phoneNumber: user.phoneNumber,
          citizenIdentification: user.citizenIdentification,
          address: user.address,
          role: user.role,
        });
        setImgUrl(user.img);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu người dùng!", error);
      }
    };

    getUserById();
  }, [id]);

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
    if (formData.img) {
      userData.append("img", formData.img);
    }
    userData.append("phoneNumber", formData.phoneNumber);
    userData.append("citizenIdentification", formData.citizenIdentification);
    userData.append("address", formData.address);
    userData.append("role", formData.role);

    try {
      await axios.put(`${Url}/api/users/update/${id}`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Cập nhật người dùng thành công !", {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 3000);
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật người dùng!", error);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4">Cập nhật người dùng</h2>
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
            <Form.Group controlId="formImg" className="mb-3">
              <Form.Label>Hình</Form.Label>
              <Form.Control
                type="file"
                name="img"
                onChange={handleFileChange}
              />
            </Form.Group>
            <img
              src={`${Url}/uploads/${imgUrl}`}
              style={{ width: "200px" }}
            ></img>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-2">
          <i className="fas fa-check"></i> Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default EditUser;
