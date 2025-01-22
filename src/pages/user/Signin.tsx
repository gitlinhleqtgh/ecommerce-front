import React, { useState } from "react";
import Layout from "../home/Layout";
import { signin, authenticate, isAuthenticated } from "../../auth";
import { Redirect } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";

const Signin: React.FunctionComponent = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
    role: null,
  });
  const { email, password, loading, error, redirectToReferrer } = user;
  const { values } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setUser({ ...user, error: "", [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setUser({ ...user, error: "", loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setUser({ ...user, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setUser({
            ...user,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
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
      <GoogleSignInButton
        setUser={(user) => {
          setUser({ ...user, edirectToReferrer: true });
        }}
      />
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
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Đăng Nhập"
      description="Đăng nhập vào cửa hàng !"
      className="container col-md-col-8 offset-md-2"
    >
      <React.Fragment>
        {showLoading()}
        {showError()}
        {signUpForm()}
        {redirectUser()}
      </React.Fragment>
    </Layout>
  );
};

export default Signin;
