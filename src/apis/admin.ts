import axios from 'axios';
import { API } from "../config/config";

export const createCategory = async (userId, token, category) => {
  try {
    const response = await axios.post(`${API}/category/create/${userId}`, category, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async (userId, token, product) => {
  try {
    const response = await axios.post(`${API}/product/create/${userId}`, product, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API}/categories`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API}/products?limit=undefined`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (productId, userId, token) => {
  try {
    const response = await axios.delete(`${API}/product/${productId}/${userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API}/product/${productId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (productId, userId, token, product) => {
  try {
    const response = await axios.put(`${API}/product/${productId}/${userId}`, product, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
