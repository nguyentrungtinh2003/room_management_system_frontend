import axios from "axios";
import React, { useEffect, useState } from "react";
import Url from "../Config/Url";
import { ToastContainer, toast, Slide } from "react-toastify";
import { Badge } from "react-bootstrap";

const Tenant = () => {
  const [user, setUser] = useState({});
  const [room, setRoom] = useState([]);
  useEffect(() => {
    fetchUser();
    fetchRoom();
  }, []);

  const fetchUser = () => {
    axios
      .get(`${Url}/api/users/${localStorage.getItem("id")}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log("Get user by id fail !");
      });
  };

  const fetchRoom = () => {
    axios
      .get(`${Url}/api/rooms/userId/${localStorage.getItem("id")}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.log("Get user by id fail !");
      });
  };
  return (
    <>
      <div className="row">
        <div className="col-3 mt-2">
          <div className="card">
            <h3>Thông tin người thuê</h3>
            <img
              className="img rounded m-2 w-50"
              src={`${Url}/uploads/${user.img}`}
              alt="Người thuê"
            />
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
              <p className="card-text">{user.phoneNumber}</p>
              <p className="card-text">{user.address}</p>
              <p className="card-text">{user.email}</p>
              <a href="#" className="btn btn-primary">
                Xem
              </a>
            </div>
          </div>
        </div>
        <div className="col-9 mt-2">
          <h3 className="mb-3">Số người ở trong phòng</h3>
          <h4 className="mb-4">
            {room.length > 0 && (
              <Badge>
                {room.reduce((acc, ro) => acc + ro.tenants.length, 0)}{" "}
                <i className="fas fa-user"></i>
              </Badge>
            )}
          </h4>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên phòng</th>
                <th>Dãy phòng</th>
                <th>Chủ trọ</th>
                <th>Hình chủ trọ</th>
                <th>Người thuê</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {room.map((ro) => (
                <tr key={ro.id}>
                  <td>{ro.id}</td>
                  <td>{ro.roomName}</td>
                  <td>{ro.building.name}</td>
                  <td>{ro.building.landlord.username}</td>
                  <td>
                    <img
                      src={`${Url}/uploads/${ro.building.landlord.img}`}
                      alt="User Avatar"
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>
                    {ro.tenants.map((ten) => (
                      <Badge variant="secondary">{ten.username}</Badge>
                    ))}
                  </td>
                  <td>{ro.rentPrice} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tenant;
