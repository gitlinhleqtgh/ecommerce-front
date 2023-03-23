import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Checkout: React.FunctionComponent<{ products: any }> = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  return (
    <div>
      <h2>Tổng tiền : ${getTotal()}</h2>

      {isAuthenticated() ? (
        <button className="btn btn-primary">Checkout</button>
      ) : (
        <Link to="/signin">
          <button className="btn btn-primary">Signin</button>
        </Link>
      )}
    </div>
  );
};
export default Checkout;
