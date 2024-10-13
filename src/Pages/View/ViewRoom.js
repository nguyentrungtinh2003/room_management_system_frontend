import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Url from "../../Config/Url";
import { Card, Row, Col, Badge } from "react-bootstrap";

const ViewRoom = () => {
  const [room, setRoom] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${Url}/api/rooms/${id}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.log("Error get room by id ", error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h3>Thông tin phòng</h3>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              {room.img && (
                <img
                  src={`${Url}/uploads/${room.img}`}
                  alt="Room"
                  className="img-fluid rounded shadow-sm"
                />
              )}
            </Col>
            <Col md={6}>
              <h4>
                <strong>Tên phòng: </strong> {room.roomName}
              </h4>
              <p>
                <strong>Mã số ID: </strong> {room.id}
              </p>
              <p>
                <strong>Giá: </strong> {room.rentPrice} VND
              </p>
              <p>
                <strong>Dãy phòng:</strong>{" "}
                {room.building && room.building.name}
                {"  "}
                {room.building && room.building.img && (
                  <img
                    src={`${Url}/uploads/${room.building.img}`}
                    alt="Building"
                    className="w-25 rounded shadow-sm mt-2"
                  />
                )}
              </p>
              <p>
                <strong>Trạng thái:</strong>
                {"  "}
                {room.status === "OCCUPIED" ? (
                  <Badge bg="success">Đã thuê</Badge>
                ) : (
                  <Badge bg="success">Phòng trống</Badge>
                )}
              </p>

              {/* Sửa phần hiển thị danh sách tenants */}
              {room.tenants && room.tenants.length > 0 ? (
                room.tenants.map((tenant) => (
                  <div key={tenant.id}>
                    <p>
                      <strong>Người thuê: </strong> {tenant.username}
                      {"  "}
                      {tenant.img && (
                        <img
                          src={`${Url}/uploads/${tenant.img}`}
                          alt="User"
                          className="w-25 rounded-circle shadow-sm mt-2"
                        />
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <p>Không có người thuê.</p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewRoom;
