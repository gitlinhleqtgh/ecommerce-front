import React, {Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout,isAuthenticated } from '../auth'


const isActive = (history, path) => {

    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = withRouter(({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Trang chủ
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                >
                    Trang Dashboard
                </Link>
            </li>
           )}

           {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                >
                    Trang Dashboard
                </Link>
            </li>
           )}

           {!isAuthenticated() && (
               <Fragment>
                    <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin"
                >
                    Đăng Nhập
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                >
                    Đăng Kí
                </Link>
            </li>
             </Fragment>
           )}
            {isAuthenticated() && (
                <li className="nav-item">
                <span
                    className="nav-link"
                    style={{ cursor: 'pointer', color: '#ffffff' }}
                    onClick={() => signout(() =>{
                        history.push("/");
                    })}
                >
                    Đăng Xuất
                </span>

            </li>
            )}
        </ul>

    </div >
));
export default Menu;