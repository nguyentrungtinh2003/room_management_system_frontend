import axios from "axios";
import React, { useEffect, useState } from "react";
import Url from "../Config/Url";

const Admin = () => {
  const [users, setUsers] = useState([]);
  // State quản lý mục được chọn
  const [selectedItem, setSelectedItem] = useState("users");

  // Hàm để xử lý khi người dùng chọn một mục từ danh sách
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    axios
      .get(`${Url}/api/users/all`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Get all users fail !", error);
      });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-3">
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
        </div>
        <div className="col-9">
          {/* Hiển thị bảng dựa trên mục được chọn */}
          {selectedItem === "users" && (
            <div>
              <h3 className="mt-2">Quản lí người dùng</h3>
              <a href="/addUser">
                <button className="btn btn-primary">
                  <i className="fas fa-add"></i>
                </button>
              </a>
              <table className="table table-striped mt-2">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Hình</th>
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
          {selectedItem === "rooms" && (
            <div>
              <h3>Quản lí dãy phòng</h3>
              {/* Nội dung form hoặc bảng cho quản lí dãy phòng */}
              <a href="/addUser">
                <button className="btn btn-primary">
                  <i className="fas fa-add"></i>
                </button>
              </a>
              <table className="table table-striped mt-2">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên dãy phòng</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Hình</th>
                    <th scope="col">Chủ trọ</th>
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
          {selectedItem === "roomDetails" && (
            <div>
              <h3>Quản lí phòng</h3>
              {/* Nội dung form hoặc bảng cho quản lí phòng */}
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
