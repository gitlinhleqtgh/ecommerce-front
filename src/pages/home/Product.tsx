import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read } from "../../apis/home";
import Card from "./Card";

const Product: React.FunctionComponent<any> = (props) => {
  const [product, setProduct] = useState<{ name: string; description: string }>(
    { name: "", description: "" }
  );
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  return (
    <Layout
      title={product.name}
      description="Cửa hàng Đèn Điện Dân Dụng !!!"
      className="container-fluid"
    >
      <React.Fragment>
        <h2 className="mb-4">Chi tiết sản phẩm </h2>
        <div className="row">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
      </React.Fragment>
    </Layout>
  );
};
export default Product;
