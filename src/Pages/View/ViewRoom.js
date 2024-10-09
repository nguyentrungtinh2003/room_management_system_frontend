import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Url from "../../Config/Url";
import { Card, Row, Col } from "react-bootstrap";

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
              <img
                src={"https://via.placeholder.com/150"}
                alt="Room"
                className="img-fluid rounded shadow-sm"
              />
            </Col>
            <Col md={6}>
              <h4>
                <strong>Tên phòng:</strong>
              </h4>
              <p>
                <strong>Mã số ID:</strong>
              </p>
              <p>
                <strong>Giá:</strong>
              </p>
              <p>
                <strong>Dãy phòng:</strong>
              </p>
              <p>
                <strong>Trạng thái:</strong>
              </p>

              <img
                src={"https://via.placeholder.com/150"}
                alt="User"
                className="w-25 rounded-circle shadow-sm mt-2"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewRoom;
