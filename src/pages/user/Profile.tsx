import React, { useState, useEffect, useReducer } from "react";
import Layout from "../home/Layout";
import { isAuthenticated } from "../../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "../../apis/user";

const Profile: React.FunctionComponent<any> = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "false",
    success: false,
  });

  const { token } = isAuthenticated();

  const { name, email, password, error, success } = values;
  const init = (userId) => {
    // console.log(userId)
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: "" });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: "", [name]: e.target.value });
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Tên</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Mật Khẩu </label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Thay đổi
      </button>
    </form>
  );

  return (
    <Layout
      title="Thông tin tài khoản ."
      description="Chỉnh sửa thông tin !!!"
      className="container-fluid"
    >
      <React.Fragment>
        <h2 className="mb-4">Profile update</h2>
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </React.Fragment>
    </Layout>
  );
};

export default Profile;
