import React from "react";

const Tenant = () => {
  return (
    <>
      <div className="row">
        <div className="col-3 mt-2">
          <div className="card">
            <h3>Thông tin người thuê</h3>
            <img
              className="img rounded-circle m-2 w-50"
              src="https://via.placeholder.com/100"
              alt="Người thuê"
            />
            <div className="card-body">
              <h5 className="card-title">Nguyễn Văn A</h5>
              <p className="card-text">0798948708</p>
              <p className="card-text">Long An</p>
              <p className="card-text">trungtinhn300@gmail.com</p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col-9 mt-2">
          <h3 className="mb-3">Số người ở trong phòng</h3>
          <h4 className="mb-4">3 người</h4>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Họ tên</th>
                <th>Tuổi</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nguyễn Văn B</td>
                <td>25</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">
                    <i className="fas fa-edit"></i> Sửa
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <i className="fas fa-trash-alt"></i> Xoá
                  </button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Trần Văn C</td>
                <td>30</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">
                    <i className="fas fa-edit"></i> Sửa
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <i className="fas fa-trash-alt"></i> Xoá
                  </button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Lê Văn D</td>
                <td>28</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">
                    <i className="fas fa-edit"></i> Sửa
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <i className="fas fa-trash-alt"></i> Xoá
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tenant;
