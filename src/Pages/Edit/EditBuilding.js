import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Url from "../../Config/Url";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";

const EditBuilding = () => {
  const token = localStorage.getItem("token");
  const [imgUrl, setImgUrl] = useState("");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    landlord_id: "",
    img: null,
  });

  useEffect(() => {
    // Fetch user by ID when component mounts
    const getUserById = async () => {
      try {
        const response = await axios.get(`${Url}/api/buildings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const building = response.data;
        setFormData({
          name: building.name,
          address: building.address,
          landlord_id: building.landlord.id,
          img: null,
        });
        setImgUrl(building.img);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu dãy phòng!", error);
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

    const buildingData = new FormData();
    buildingData.append("name", formData.name);
    buildingData.append("address", formData.address);
    buildingData.append("landlord_id", formData.landlord_id);

    if (formData.img) {
      buildingData.append("img", formData.img);
    }

    try {
      await axios.put(`${Url}/api/buildings/update/${id}`, buildingData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Cập nhật dãy phòng thành công !", {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 3000);
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật dãy phòng !", error);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4">Cập nhật dãy phòng</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName" className="mb-3">
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
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ dãy phòng ..."
                name="address"
                value={formData.address}
                onChange={handleInputChange}
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

export default EditBuilding;
