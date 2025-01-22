import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Signin from "./pages/user/Signin";
import Home from "./pages/home/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./pages/user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./pages/user/AdminDashboard";
import AddCategory from "./pages/admin/AddCategory";
import AddProduct from "./pages/admin/AddProduct";
import Shop from "./pages/home/Shop";
import Product from "./pages/home/Product";
import Cart from "./pages/home/Cart";
import Profile from "./pages/user/Profile";
import ManageProducts from "./pages/admin/ManageProducts";
import UpdateProduct from "./pages/admin/UpdateProduct";
import GoogleSignInButton from "./pages/user/GoogleSignInButton";

const Routes: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signup-oauth2" exact component={GoogleSignInButton} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <PrivateRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
