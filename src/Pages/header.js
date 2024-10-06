import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Url from "../Config/Url";

const Header = () => {
  const user = {
    id: localStorage.getItem("id"),
    username: localStorage.getItem("username"),
    img: localStorage.getItem("img"),
    role: localStorage.getItem("role"),
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg color-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            Phòng Trọ
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Biểu tượng Home bên trái */}
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  <i className="fas fa-home text-white"></i>
                </a>
              </li>
            </ul>
          </div>
          {/* Biểu tượng User bên phải */}

          <ul className="navbar-nav ml-auto">
            {user.username != null ? (
              <>
                <li className="nav-item">
                  <a
                    href={`http://localhost:3000/${
                      user.role ? user.role.toLowerCase() : ""
                    }`}
                    className="nav-link"
                  >
                    <span>{user.username}</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href={`http://localhost:3000/${
                      user.role ? user.role.toLowerCase() : ""
                    }`}
                    className="nav-link"
                  >
                    <img
                      src={`${Url}/uploads/${user.img}`}
                      alt="User Avatar"
                      style={{ width: "40px", borderRadius: "50%" }}
                      className="user-avatar"
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => {
                      // Xóa dữ liệu khỏi localStorage
                      localStorage.removeItem("id");
                      localStorage.removeItem("username");
                      localStorage.removeItem("img");
                      localStorage.removeItem("role");
                      // Chuyển hướng đến trang đăng nhập
                      window.location.href = "/login";
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-sign-out-alt text-white"></i> Đăng xuất
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/login">
                    <i className="fas fa-user text-white"></i> Đăng nhập
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
