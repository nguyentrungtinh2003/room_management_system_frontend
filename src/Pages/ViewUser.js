import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Url from "../Config/Url";
import { Card, Row, Col } from "react-bootstrap";

const ViewUser = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${Url}/api/users/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  return (
    <div className="container mt-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h3>Thông tin người dùng</h3>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <img
                src={
                  `${Url}/uploads/${user.img}` ||
                  "https://via.placeholder.com/150"
                }
                alt="User"
                className="img-fluid rounded-circle shadow-sm"
              />
            </Col>
            <Col md={8}>
              <h4>
                <strong>Họ tên:</strong> {user.username}
              </h4>
              <p>
                <strong>Mã số ID:</strong> {user.id}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {user.address}
              </p>
              <p>
                <strong>CMND/CCCD:</strong> {user.citizenIdentification}
              </p>
              <p>
                <strong>Ngày bắt đầu:</strong> {user.startDate}
              </p>
              <p>
                <strong>Vai trò:</strong> {user.role}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewUser;
