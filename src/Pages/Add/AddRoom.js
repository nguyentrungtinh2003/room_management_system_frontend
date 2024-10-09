import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Url from "../../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";

const AddRoom = () => {
  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4">Thêm phòng</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Tên phòng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên phòng ..."
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập giá phòng ..."
                name="price"
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

export default AddRoom;
