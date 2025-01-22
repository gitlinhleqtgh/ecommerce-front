import React from "react";
import Layout from "../home/Layout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";

const AdminDashboard: React.FunctionComponent = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Thêm danh mục loại đèn
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              {" "}
              Thêm đèn mới
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Quản lý sản phẩm
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Thông Tin Tài Khoản</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Khách hàng"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Trang quản lý"
      description={`Xin chào ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};
export default AdminDashboard;
