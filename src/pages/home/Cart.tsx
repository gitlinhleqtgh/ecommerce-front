import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCart, removeItem } from "./cartHelpers";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart: React.FunctionComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cartItems = getCart();
    setItems(cartItems);
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2>Giỏ hàng của bạn có {`${items.length}`} sản phẩm ! </h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Giỏ hàng của bạn trống !
      <br />
      <Link to="/shop">Tiếp tục mua hàng ...</Link>
    </h2>
  );

  return (
    <Layout
      title="Giỏ hàng "
      description="Cửa hàng Đèn Điện Dân Dụng  !!!"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Giỏ hàng của bạn ! </h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
