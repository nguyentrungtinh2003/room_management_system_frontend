import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Url from "../../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";

const AddBuilding = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    landlord_id: localStorage.getItem("id"),
    img: null,
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

    const buildingData = new FormData();
    buildingData.append("name", formData.name);
    buildingData.append("address", formData.address);
    buildingData.append("landlord_id", formData.landlord_id);
    buildingData.append("img", formData.img);

    try {
      await axios.post(`${Url}/api/buildings/add`, buildingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Tạo dãy phòng thành công !", {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 3000);
    } catch (error) {
      console.error("There was an error add building !", error);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4">Thêm dãy phòng</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Tên dãy phòng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên dãy phòng ..."
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ dãy phòng ..."
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

export default AddBuilding;
