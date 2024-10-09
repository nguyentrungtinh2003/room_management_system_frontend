import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import Url from "../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";

const SendMail = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mailData = {
      email: email,
      subject: subject,
      body: body,
    };

    try {
      const response = await axios.post(`${Url}/api/users/sendMail`, mailData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Gửi mail thành công !", {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 3000);
    } catch (error) {
      toast.error("Gửi mail thất bại !", {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 3000);
    }
  };

  return (
    <Container className="mt-5 col-6 shadow-lg">
      <ToastContainer />
      <h3 className="text-center mb-4">Gửi Mail</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTo">
          <Form.Label>Đến</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email người nhận ..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSubject">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tiêu đề ..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Nhập nội dung ..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          <i className="fas fa-paper-plane"></i> Gửi
        </Button>
      </Form>
    </Container>
  );
};

export default SendMail;
