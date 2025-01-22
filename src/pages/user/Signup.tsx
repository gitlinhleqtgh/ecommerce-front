import React, { useEffect, useState } from "react";
import Layout from "../home/Layout";
import { signup } from "../../auth";
import { Link } from "react-router-dom";

const Signup: React.FunctionComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Tên Đăng Nhập</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Mật Khẩu</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Tài khoản của bạn đã được tạo . Vui lòng{" "}
      <Link to="/signin"> đăng nhập </Link>!
    </div>
  );

  return (
    <Layout
      title="Đăng kí"
      description="Đăng kí tài khoản vào cửa hàng !"
      className="container col-md-col-8 offset-md-2"
    >
      <React.Fragment>
        {showSuccess()}
        {showError()}
        {signUpForm()}
      </React.Fragment>
    </Layout>
  );
};

export default Signup;
