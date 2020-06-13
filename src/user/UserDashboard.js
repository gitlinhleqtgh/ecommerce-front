import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth'
import { Link } from "react-router-dom";

const Dashboard = () => {

    const { user: {  name, email, role } } = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">Giỏ Hàng</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/profile/update"> Chỉnh Sửa Thông Tin Cá Nhân</Link>
                    </li>
                </ul>
            </div>

        )
    }
    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Thông Tin Người Dùng</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Khách hàng"}
                    </li>
                </ul>
            </div>
        )
    }

    const purchaseHistory = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Lịch Sử Mua Hàng</h3>
                <ul className="list-group">
                    <li className="list-group-item">Lịch sử</li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title="Trang quản lý" description={`Xin chào ${name}`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>


        </Layout>
    )
}
export default Dashboard;