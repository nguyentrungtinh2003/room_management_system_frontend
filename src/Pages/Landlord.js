import axios from "axios";
import React, { useEffect, useState } from "react";
import Url from "../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";
import { Badge } from "react-bootstrap";

const Landlord = () => {
  const [users, setUsers] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  // State quản lý mục được chọn
  const [selectedItem, setSelectedItem] = useState("users");

  // Hàm để xử lý khi người dùng chọn một mục từ danh sách
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    fetchUsers();
    fetchBuildings();
  }, []);

  useEffect(() => {
    if (buildings.length > 0) {
      fetchRooms();
    }
  }, [buildings]);

  const fetchUsers = () => {
    axios
      .get(`${Url}/api/users/all`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Get all users fail !", error);
      });
  };

  const fetchBuildings = () => {
    axios
      .get(`${Url}/api/buildings/landlordId/${localStorage.getItem("id")}`)
      .then((response) => {
        setBuildings(response.data);
      })
      .catch((error) => {
        console.log("Get all buildings fail !", error);
      });
  };

  const fetchRooms = async () => {
    try {
      const roomRequest = buildings.map((building) => {
        axios.get(`${Url}/api/rooms/buildingId/${building.id}`);
      });
      const roomResponse = await Promise.all(roomRequest);
      const allRoom = roomResponse.flatMap((res) => {
        if (res.data) {
          return res.data;
        } else {
          console.log("Data is null !");
          return [];
        }
      });
      setRooms(allRoom);
    } catch (error) {
      console.log("Có lỗi : ", error);
    }
  };

  const handelDeleteUser = (id, name) => {
    const confirmDelete = window.confirm(
      `Bạn có muốn xoá người dùng ${name} không ?`
    );
    if (confirmDelete) {
      axios
        .delete(`${Url}/api/users/delete/${id}`)
        .then((response) => {
          console.log("Delete user success");
          toast.success("Xoá người dùng thành công !", {
            position: "top-right",
            autoClose: 3000,
            transition: Slide,
          });
          setTimeout(() => {
            window.location.href = "/admin";
          }, 3000);
        })
        .catch((error) => {
          console.log("Error delete user : ", error);
        });
    }
  };

  const handelDeleteBuilding = (id, name) => {
    const confirmDelete = window.confirm(
      `Bạn có muốn xoá dãy phòng ${name} không ?`
    );
    if (confirmDelete) {
      axios
        .delete(`${Url}/api/buildings/delete/${id}`)
        .then((response) => {
          console.log("Delete building success");
          toast.success("Xoá dãy phòng thành công !", {
            position: "top-right",
            autoClose: 3000,
            transition: Slide,
          });
          setTimeout(() => {
            window.location.href = "/admin";
          }, 3000);
        })
        .catch((error) => {
          console.log("Error delete building : ", error);
        });
    }
  };

  const [searchUser, setSearchUser] = useState("");
  const handleInputSearchUserChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleSearchUser = (e) => {
    e.preventDefault();
    if (searchUser.trim() == "") {
      fetchUsers();
    } else {
      axios
        .get(`${Url}/api/users/search?username=${searchUser}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("Search user fail!", error);
        });
    }
  };

  const [searchBuilding, setSearchBuilding] = useState("");
  const handleInputSearchBuildingChange = (e) => {
    setSearchBuilding(e.target.value);
  };

  const handleSearchBuilding = (e) => {
    e.preventDefault();
    if (searchBuilding.trim() == "") {
      fetchBuildings();
    } else {
      axios
        .get(`${Url}/api/buildings/search?name=${searchBuilding}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setBuildings(response.data);
        })
        .catch((error) => {
          console.log("Search user fail!", error);
        });
    }
  };

  const [searchRoom, setSearchRoom] = useState("");
  const handleInputSearchRoomChange = (e) => {
    setSearchRoom(e.target.value);
  };

  const handleSearchRoom = (e) => {
    e.preventDefault();
    if (searchRoom.trim() == "") {
      fetchRooms();
    } else {
      axios
        .get(`${Url}/api/rooms/search?name=${searchRoom}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setRooms(response.data);
        })
        .catch((error) => {
          console.log("Search room fail!", error);
        });
    }
  };

  return (
    <>
      <div className="row">
        <ToastContainer />
        <div className="col-2">
          <ul className="list-group mt-2">
            <li
              className={`list-group-item ${
                selectedItem === "users" ? "active" : ""
              }`}
              onClick={() => handleItemClick("users")}
            >
              Quản lí người dùng
            </li>
            <li
              className={`list-group-item ${
                selectedItem === "rooms" ? "active" : ""
              }`}
              onClick={() => handleItemClick("rooms")}
            >
              Quản lí dãy phòng
            </li>
            <li
              className={`list-group-item ${
                selectedItem === "roomDetails" ? "active" : ""
              }`}
              onClick={() => handleItemClick("roomDetails")}
            >
              Quản lí phòng
            </li>
            <li
              className={`list-group-item ${
                selectedItem === "revenue" ? "active" : ""
              }`}
              onClick={() => handleItemClick("revenue")}
            >
              Quản lí doanh thu
            </li>
            <li
              className={`list-group-item ${
                selectedItem === "bills" ? "active" : ""
              }`}
              onClick={() => handleItemClick("bills")}
            >
              Quản lí hoá đơn
            </li>
          </ul>
          <a href="/sendMail">
            <button className="btn btn-primary mt-2">
              <i className="fas fa-envelope"></i>
            </button>
          </a>
        </div>
        <div className="col-10">
          {/* Hiển thị bảng dựa trên mục được chọn */}
          {selectedItem === "users" && (
            <div>
              <h3 className="mt-2">Quản lí người dùng</h3>
              <div className="row mt-2">
                <div className="col-6">
                  <form onSubmit={handleSearchUser} className="d-flex mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên người dùng ..."
                      value={searchUser}
                      onChange={handleInputSearchUserChange}
                    />

                    <button className="btn btn-primary" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
              <a href="/addUser">
                <button className="btn btn-primary mt-2">
                  <i className="fas fa-add"></i>
                </button>
              </a>
              <table className="table table-striped mt-2">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Hình</th>
                    <th scope="col">Vai trò</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Xem</th>
                    <th scope="col">Sửa</th>
                    <th scope="col">Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                          <img
                            src={`${Url}/uploads/${user.img}`}
                            alt="User Avatar"
                            style={{ width: "50px" }}
                          />
                        </td>
                        <td>{user.role}</td>
                        <td>
                          {user.enabled ? (
                            <Badge bg="success">
                              <i className="fas fa-check"></i>
                            </Badge>
                          ) : (
                            <Badge bg="danger">
                              <i className="fas fa-close"></i>
                            </Badge>
                          )}
                        </td>
                        <td>
                          {" "}
                          <a href={`/viewUser/${user.id}`}>
                            <button className="btn btn-primary btn-sm me-2">
                              <i className="fas fa-eye"></i>
                            </button>
                          </a>
                        </td>
                        <td>
                          <a href={`/editUser/${user.id}`}>
                            <button className="btn btn-primary btn-sm me-2">
                              <i className="fas fa-edit"></i>
                            </button>
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handelDeleteUser(user.id, user.username)
                            }
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {selectedItem === "rooms" && (
            <div className="mt-2">
              <h3>Quản lí dãy phòng</h3>
              {/* Nội dung form hoặc bảng cho quản lí dãy phòng */}
              <div className="row mt-2">
                <div className="col-6">
                  <form onSubmit={handleSearchBuilding} className="d-flex mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên dãy phòng ..."
                      value={searchBuilding}
                      onChange={handleInputSearchBuildingChange}
                    />

                    <button className="btn btn-primary" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
              <a href="/addBuilding">
                <button className="btn btn-primary mt-2">
                  <i className="fas fa-add"></i>
                </button>
              </a>
              <table className="table table-striped mt-2">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên dãy phòng</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Chủ trọ</th>
                    <th scope="col">Hình chủ trọ</th>
                    <th scope="col">Hình dãy phòng</th>
                    <th scope="col">Xem</th>
                    <th scope="col">Sửa</th>
                    <th scope="col">Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {buildings.map((building) => {
                    return (
                      <tr key={building.id}>
                        <td>{building.id}</td>
                        <td>{building.name}</td>
                        <td>{building.address}</td>

                        <td>{building.landlord.username}</td>
                        <td>
                          <img
                            src={`${Url}/uploads/${building.landlord.img}`}
                            alt="Landlord Avatar"
                            style={{ width: "50px" }}
                          />
                        </td>

                        <td>
                          <img
                            src={`${Url}/uploads/${building.img}`}
                            alt="Building Avatar"
                            style={{ width: "50px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <a href={`/viewBuilding/${building.id}`}>
                            <button className="btn btn-primary btn-sm me-2">
                              <i className="fas fa-eye"></i>
                            </button>
                          </a>
                        </td>
                        <td>
                          <a href={`/editBuilding/${building.id}`}>
                            <button className="btn btn-primary btn-sm me-2">
                              <i className="fas fa-edit"></i>
                            </button>
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handelDeleteBuilding(building.id, building.name)
                            }
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {selectedItem === "roomDetails" && (
            <div>
              <h3 className="mt-2">Quản lí phòng</h3>
              {/* Nội dung form hoặc bảng cho quản lí phòng */}
              <div className="row mt-2">
                <div className="col-6">
                  <form className="d-flex mt-2" onSubmit={handleSearchRoom}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên phòng ..."
                      value={searchRoom}
                      onChange={handleInputSearchRoomChange}
                    />

                    <button className="btn btn-primary" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
              <a href="/addRoom">
                <button className="btn btn-primary mt-2">
                  <i className="fas fa-add"></i>
                </button>
              </a>
              <table className="table table-striped mt-2">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên phòng</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Hình</th>
                    <th scope="col">Dãy phòng</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Xem</th>
                    <th scope="col">Sửa</th>
                    <th scope="col">Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => {
                    return (
                      <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.roomName}</td>
                        <td>{room.rentPrice}</td>
                        <td>
                          <img
                            src={`${Url}/uploads/${room.img}`}
                            alt="Room Avatar"
                            style={{ width: "50px" }}
                          />
                        </td>

                        <td>{room.building.name}</td>

                        <td>
                          {room.status == "OCCUPIED" ? (
                            <Badge bg="success">
                              <i className="fas fa-check"></i>
                            </Badge>
                          ) : (
                            <Badge bg="danger">
                              <i className="fas fa-close"></i>
                            </Badge>
                          )}
                        </td>
                        <td>
                          {" "}
                          <a href={`/viewRoom/${room.id}`}>
                            <button className="btn btn-primary btn-sm me-2">
                              <i className="fas fa-eye"></i>
                            </button>
                          </a>
                        </td>
                        <td>
                          <a href={`/editRoom/${room.id}`}>
                            <button className="btn btn-primary btn-sm me-2">
                              <i className="fas fa-edit"></i>
                            </button>
                          </a>
                        </td>
                        <td>
                          <button className="btn btn-danger btn-sm">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {selectedItem === "revenue" && (
            <div>
              <h3>Quản lí doanh thu</h3>
              {/* Nội dung form hoặc bảng cho quản lí doanh thu */}
            </div>
          )}
          {selectedItem === "bills" && (
            <div>
              <h3>Quản lí hoá đơn</h3>
              {/* Nội dung form hoặc bảng cho quản lí hoá đơn */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Landlord;
