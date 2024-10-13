import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import Url from "../Config/Url";
import { Badge } from "react-bootstrap";

const Home = () => {
  const [buildings, setBuldings] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchBuildings();
    fetchRooms();
  }, []);

  const fetchBuildings = () => {
    axios.get(`${Url}/api/buildings/all`).then((response) => {
      setBuldings(response.data);
    });
  };

  const fetchRooms = () => {
    axios.get(`${Url}/api/rooms/all`).then((response) => {
      setRooms(response.data);
    });
  };
  return (
    <>
      <div>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            {buildings &&
              buildings.map((building, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index == 0 ? "active" : ""}`}
                >
                  <img
                    src={`${Url}/uploads/${building.img}`}
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>{building.name}</h5>
                    <p>{building.address}</p>
                  </div>
                </div>
              ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Danh sách phòng</h2>
        <div className="row">
          {rooms &&
            rooms.map((room) => (
              <div className="col-md-3">
                <div className="card mb-4 shadow-sm">
                  <img
                    src={`${Url}/uploads/${room.img}`}
                    className="card-img-top w-100"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{room.roomName}</h5>
                    <p className="card-text">Giá : {room.rentPrice} VND</p>
                    <p className="card-text">
                      {room.status == "OCCUPIED" ? (
                        <Badge bg="success">Đã thuê</Badge>
                      ) : (
                        <Badge bg="success">Phòng trống</Badge>
                      )}
                    </p>
                    <a
                      href={`/viewRoom/${room.id}`}
                      className="btn btn-primary"
                    >
                      Xem
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
