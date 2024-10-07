import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Url from "../../Config/Url";
import { Card, Row, Col } from "react-bootstrap";

const ViewBuilding = () => {
  const [building, setBuilding] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${Url}/api/buildings/${id}`)
      .then((response) => {
        setBuilding(response.data);
      })
      .catch((error) => {
        console.log("Error get building by id ", error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h3>Thông tin dãy phòng</h3>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <img
                src={
                  `${Url}/uploads/${building.img}` ||
                  "https://via.placeholder.com/150"
                }
                alt="Building"
                className="img-fluid rounded shadow-sm"
              />
            </Col>
            <Col md={6}>
              <h4>
                <strong>Tên dãy phòng:</strong> {building.name}
              </h4>
              <p>
                <strong>Mã số ID:</strong> {building.id}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {building.address}
              </p>
              <p>
                <strong>Chủ trọ:</strong>{" "}
                {building.landlord ? building.landlord.username : ""}
              </p>
              {building.landlord && (
                <img
                  src={
                    building.landlord.img
                      ? `${Url}/uploads/${building.landlord.img}`
                      : "https://via.placeholder.com/150"
                  }
                  alt="User"
                  className="w-25 rounded-circle shadow-sm mt-2"
                />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewBuilding;
