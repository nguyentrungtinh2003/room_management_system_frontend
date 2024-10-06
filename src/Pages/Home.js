import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Home = () => {
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
            <div className="carousel-item active">
              <img
                src="https://blog.rever.vn/hubfs/cho_thue_phong_tro_moi_xay_gia_re_ngay_phuong_15_tan_binh3.jpg"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://img.homedy.com/store/images/2021/06/17/thiet-ke-phong-tro-phong-cach-chung-cu-mini-637595434354329293.jpg"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://trongoixaynha.com/wp-content/uploads/2022/10/thiet-ke-phong-tro-co-gac-lung-9.jpg"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
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
        <div className="row">
          <div className="col-md-3">
            <div className="card mb-4 shadow-sm">
              <img
                src="https://via.placeholder.com/1200x400"
                className="card-img-top w-100"
              />
              <div className="card-body">
                <h5 className="card-title">Phòng 1</h5>
                <p className="card-text">Giá : 1600000 VND</p>
                <p className="card-text">Trống</p>
                <a href="#" className="btn btn-primary">
                  Chi tiết
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4 shadow-sm">
              <img
                src="https://via.placeholder.com/1200x400"
                className="card-img-top w-100"
              />
              <div className="card-body">
                <h5 className="card-title">Phòng 1</h5>
                <p className="card-text">Giá : 1600000 VND</p>
                <p className="card-text">Trống</p>
                <a href="#" className="btn btn-primary">
                  Chi tiết
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4 shadow-sm">
              <img
                src="https://via.placeholder.com/1200x400"
                className="card-img-top w-100"
              />
              <div className="card-body">
                <h5 className="card-title">Phòng 1</h5>
                <p className="card-text">Giá : 1600000 VND</p>
                <p className="card-text">Trống</p>
                <a href="#" className="btn btn-primary">
                  Chi tiết
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4 shadow-sm">
              <img
                src="https://via.placeholder.com/1200x400"
                className="card-img-top w-100"
              />
              <div className="card-body">
                <h5 className="card-title">Phòng 1</h5>
                <p className="card-text">Giá : 1600000 VND</p>
                <p className="card-text">Trống</p>
                <a href="#" className="btn btn-primary">
                  Chi tiết
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
