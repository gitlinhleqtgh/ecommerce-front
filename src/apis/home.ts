import axiosInstance from "../config/axios";
import { API } from "../config/config";

import queryString from "query-string";

export const getProducts = async (sortBy) => {
  try {
    const response = await axiosInstance.get(
      `/products?sortBy=${sortBy}&order=desc&limit=6`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`${API}/categories`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFilteredProducts = async (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };

  try {
    const response = await axiosInstance.post(`${API}/products/by/search`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const list = async (params) => {
  const query = queryString.stringify(params);
  console.log("query", query);
  try {
    const response = await axiosInstance.get(`${API}/products/search?${query}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const read = async (productId) => {
  try {
    const response = await axiosInstance.get(`${API}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
