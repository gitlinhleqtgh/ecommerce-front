import React from "react";
import { API } from "../../config/config";

const ShowImage: React.FunctionComponent<any> = ({ item, url }) => (
  <div className="product-img">
    <img
      // src={`${API}/${url}/photo/${item._id}`}
      src="node2.jpeg"
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
  </div>
);

export default ShowImage;
