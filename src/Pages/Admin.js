import axios from "axios";
import React, { useEffect, useState } from "react";
import Url from "../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";
import { Badge, Button } from "react-bootstrap";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  // State quản lý mục được chọn
  const [selectedItem, setSelectedItem] = useState("users");

  // Page users
  const [currentPageUser, setCurrentPageUser] = useState(0);
  const [totalPagesUser, setTotalPagesUser] = useState(1);
  const [sortByUser, setSortByUser] = useState("username");
  const [sortDirUser, setSortDirUser] = useState("asc");

  // Page buildings
  const [currentPageBuilding, setCurrentPageBuilding] = useState(0);
  const [totalPagesBuilding, setTotalPagesBuilding] = useState(1);
  const [sortByBuilding, setSortByBuilding] = useState("name");
  const [sortDirBuilding, setSortDirBuilding] = useState("asc");

  const pageSize = 3;

  // Hàm để xử lý khi người dùng chọn một mục từ danh sách
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    fetchUsers(currentPageUser, sortByUser, sortDirUser);
    fetchBuildings(currentPageBuilding, sortByBuilding, sortDirBuilding);
    fetchRooms();
  }, [
    currentPageUser,
    sortByUser,
    sortDirUser,
    currentPageBuilding,
    sortByBuilding,
    sortDirBuilding,
  ]);

  const fetchUsers = async (
    page = 0,
    sortByUser = "username",
    sortDirUser = "asc"
  ) => {
    await axios
      .get(
        `${Url}/api/users/page?page=${page}&size=${pageSize}&sortBy=${sortByUser}&sortDir=${sortDirUser} `
      )
      .then((response) => {
        setUsers(response.data.content);
        setCurrentPageUser(response.data.pageable.pageNumber); // Thay đổi ở đây
        setTotalPagesUser(response.data.totalPages);
      })
      .catch((error) => {
        console.log("Get all users fail !", error);
      });
  };

  // Hàm chuyển hướng trang
  const goToPageUser = (page) => {
    if (page >= 0 && page < totalPagesUser) {
      setCurrentPageUser(page);
    }
  };

  // Hàm đổi hướng sắp xếp
  const toggleSortDirUser = () => {
    setSortDirUser((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const fetchBuildings = async (
    page = 0,
    sortByBuilding = "name",
    sortDirBuilding = "asc"
  ) => {
    await axios
      .get(
        `${Url}/api/buildings/page?page=${page}&size=${pageSize}&sortBy=${sortByBuilding}&sortDir=${sortDirBuilding} `
      )
      .then((response) => {
        setBuildings(response.data.content);
        setCurrentPageBuilding(response.data.pageable.pageNumber); // Thay đổi ở đây
        setTotalPagesBuilding(response.data.totalPages);
      })
      .catch((error) => {
        console.log("Get all buildings fail !", error);
      });
  };

  // Hàm chuyển hướng trang
  const goToPageBuilding = (page) => {
    if (page >= 0 && page < totalPagesBuilding) {
      setCurrentPageBuilding(page);
    }
  };

  // Hàm đổi hướng sắp xếp
  const toggleSortDirBuilding = () => {
    setSortDirBuilding((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const fetchRooms = () => {
    axios
      .get(`${Url}/api/rooms/all`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.log("Get all room fail !", error);
      });
  };

  const handelDeleteUser = (id, name) => {
    const confirmDelete = window.confirm(
      `Bạn có muốn khoá người dùng ${name} không ?`
    );
    if (confirmDelete) {
      axios
        .delete(`${Url}/api/users/delete/${id}`)
        .then((response) => {
          console.log("Delete user success");
          toast.success("Khoá người dùng thành công !", {
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

  const handelUnlockUser = (id, name) => {
    const confirmDelete = window.confirm(
      `Bạn có muốn mở khoá người dùng ${name} không ?`
    );
    if (confirmDelete) {
      axios
        .put(`${Url}/api/users/unlock/${id}`)
        .then((response) => {
          console.log("Unlock user success");
          toast.success("Mở khoá người dùng thành công !", {
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
              <Button onClick={toggleSortDirUser} className="m-3">
                <i className="fas fa-filter"></i> Tên:{" "}
                {sortDirUser.toUpperCase() === "asc" ? (
                  <i className="fas fa-sort-up"></i> // Biểu tượng cho sắp xếp tăng dần
                ) : (
                  <i className="fas fa-sort-down"></i> // Biểu tượng cho sắp xếp giảm dần
                )}
              </Button>
              <table className="table table-striped mt-2">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th onClick={() => setSortByUser("username")} scope="col">
                      Họ tên
                    </th>
                    <th scope="col">Email</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Hình</th>
                    <th scope="col">Vai trò</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Xem</th>
                    <th scope="col">Sửa</th>
                    <th scope="col">Khoá</th>
                    <th scope="col">Mở</th>
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
                            <Badge bg="success">Hoạt động</Badge>
                          ) : (
                            <Badge bg="danger">Bị khoá</Badge>
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
                            <i class="fas fa-lock"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              handelUnlockUser(user.id, user.username)
                            }
                          >
                            <i class="fas fa-unlock"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="d-flex m-3">
                <Button
                  className="m-2"
                  onClick={() => goToPageUser(currentPageUser - 1)}
                  disabled={currentPageUser === 0}
                >
                  <i className="fas fa-arrow-left"></i>
                </Button>
                <span className="m-2">
                  Trang {currentPageUser + 1} / {totalPagesUser}
                </span>
                <Button
                  className="m-2"
                  onClick={() => goToPageUser(currentPageUser + 1)}
                  disabled={currentPageUser + 1 === totalPagesUser}
                >
                  <i className="fas fa-arrow-right"></i>
                </Button>
              </div>
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
              <Button onClick={toggleSortDirBuilding} className="m-3">
                <i className="fas fa-filter"></i> Tên:{" "}
                {sortDirBuilding.toUpperCase() === "asc" ? (
                  <i className="fas fa-sort-up"></i> // Biểu tượng cho sắp xếp tăng dần
                ) : (
                  <i className="fas fa-sort-down"></i> // Biểu tượng cho sắp xếp giảm dần
                )}
              </Button>
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
              <div className="d-flex m-3">
                <Button
                  className="m-2"
                  onClick={() => goToPageBuilding(currentPageBuilding - 1)}
                  disabled={currentPageBuilding === 0}
                >
                  <i className="fas fa-arrow-left"></i>
                </Button>
                <span className="m-2">
                  Trang {currentPageBuilding + 1} / {totalPagesBuilding}
                </span>
                <Button
                  className="m-2"
                  onClick={() => goToPageBuilding(currentPageBuilding + 1)}
                  disabled={currentPageBuilding + 1 === totalPagesBuilding}
                >
                  <i className="fas fa-arrow-right"></i>
                </Button>
              </div>
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
                            <Badge bg="success">Đã thuê</Badge>
                          ) : (
                            <Badge bg="danger">Phòng trống</Badge>
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

export default Admin;
