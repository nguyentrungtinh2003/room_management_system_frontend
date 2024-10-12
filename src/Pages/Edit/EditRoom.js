import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Url from "../../Config/Url";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditRoom = () => {
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState("");
  const [formData, setFormData] = useState({
    roomName: "",
    rentPrice: 0.0,
    buildingId: "",
    img: null,
    tenants: [],
  });

  const [users, setUsers] = useState([]);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu phòng để cập nhật
    axios.get(`${Url}/api/rooms/${id}`).then((response) => {
      setFormData({
        ...response.data,
        buildingId: response.data.building.id,
        tenants: response.data.tenants.map((tenant) => tenant.id), // Lưu buildingId thay vì object
      });
      setImgUrl(response.data.img);
    });
    // Lấy danh sách người dùng và danh sách dãy phòng
    const fetchData = async () => {
      try {
        const [usersResponse, buildingsResponse] = await Promise.all([
          axios.get(`${Url}/api/users/all`),
          axios.get(`${Url}/api/buildings/all`),
        ]);
        setUsers(usersResponse.data);
        setBuildings(buildingsResponse.data);
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải dữ liệu!");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "rentPrice" ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      img: e.target.files[0],
    }));
  };

  const handleTenantsChange = (e) => {
    const selectedTenants = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setFormData({ ...formData, tenants: selectedTenants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { roomName, rentPrice, buildingId, img, tenants } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("roomName", roomName);
    formDataToSend.append("rentPrice", rentPrice);
    formDataToSend.append("buildingId", buildingId);
    if (img) {
      formDataToSend.append("img", img);
    }
    tenants.forEach((tenantId) => formDataToSend.append("tenants", tenantId));

    try {
      await axios.put(`${Url}/api/rooms/update/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Cập nhật phòng thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật phòng!");
      console.error("Error updating room:", error);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4">Cập nhật phòng</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formRoomName" className="mb-3">
              <Form.Label>Tên phòng</Form.Label>
              <Form.Control
                type="text"
                name="roomName"
                value={formData.roomName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formRentPrice" className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                step={0.01}
                name="rentPrice"
                value={formData.rentPrice}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formBuilding" className="mb-3">
              <Form.Label>Tên dãy phòng</Form.Label>
              <Form.Control
                as="select"
                name="buildingId"
                value={formData.buildingId}
                onChange={handleInputChange}
                required
              >
                {buildings.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formTenants" className="mb-3">
              <Form.Label>Người thuê</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={formData.tenants}
                onChange={handleTenantsChange}
                required
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group controlId="formImg" className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
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

export default EditRoom;
