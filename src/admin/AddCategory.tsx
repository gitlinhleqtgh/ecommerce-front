import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";
import { Link } from "react-router-dom";

const AddCategory: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  //hủy cấu trúc người dùng và mã thông báo từ lưu trữ cục bộ
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Thêm</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Thêm {name} thành công !</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} không được tạo !</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Quay lại .
      </Link>
    </div>
  );

  return (
    <Layout
      title="Trang quản lý"
      description={`Xin chào ${user.name} ! Thêm danh mục đèn.`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};
export default AddCategory;
