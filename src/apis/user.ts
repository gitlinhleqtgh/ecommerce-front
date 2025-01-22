import axios from 'axios';
import { API } from "../config/config";

export const read = (userId: string, token: string) => {
  return axios.get(`${API}/user/${userId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const update = (userId: string, token: string, user: object) => {
  return axios.put(`${API}/user/${userId}`, user, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const updateUser = (user: object, next: () => void) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt") || "");
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};
