import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Url from "../../Config/Url";
import { ToastContainer, toast } from "react-toastify";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    rentPrice: 0.0,
    buildingId: "",
    img: null,
    tenants: [],
  });

  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [building, setBuilding] = useState([]);

  useEffect(() => {
    // Lấy danh sách người dùng khi component được mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${Url}/api/users/all`); // Cập nhật URL theo API của bạn
        setUsers(response.data);
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải danh sách người dùng!");
        console.error("Error fetching users:", error);
      }
    };
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(`${Url}/api/buildings/all`); // Cập nhật URL theo API của bạn
        setBuilding(response.data);
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải danh sách dãy phòng!");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    fetchBuildings();
  }, []);

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

  const handleTenantsChange = (event) => {
    const selectedTenants = Array.from(event.target.selectedOptions, (option) =>
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
    formDataToSend.append("img", img);
    // Thay vì JSON.stringify(tenants)
    tenants.forEach((tenantId) => formDataToSend.append("tenants", tenantId));
    try {
      const response = await axios.post(
        `${Url}/api/rooms/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in a variable called 'token'
          },
        }
      );
      toast.success("Thêm phòng thành công!");
      // Clear form or redirect as necessary
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm phòng!");
      console.error("Error adding room:", error);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4">Thêm phòng</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formRoomName" className="mb-3">
              <Form.Label>Tên phòng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên phòng ..."
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
                placeholder="Nhập giá phòng ..."
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
            <Form.Group controlId="formBuildings" className="mb-3">
              <Form.Label>Tên dãy phòng</Form.Label>
              <Form.Control
                as="select"
                multiple
                name="buildingId"
                onChange={handleInputChange}
                required
              >
                {building.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}{" "}
                    {/* Hoặc thuộc tính khác mà bạn muốn hiển thị */}
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
                name="tenants"
                onChange={handleTenantsChange}
                required
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}{" "}
                    {/* Hoặc thuộc tính khác mà bạn muốn hiển thị */}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                Nhấn Ctrl hoặc Shift để chọn nhiều người thuê.
              </Form.Text>
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
