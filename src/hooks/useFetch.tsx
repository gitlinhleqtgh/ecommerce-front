import React, { useState } from "react";
import { authenticate } from "../auth";
import { Redirect } from "react-router-dom";

const useFetch = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectUser = (user: any) => {
    if (user && user.role === 1) {
        return <Redirect push to="/admin/dashboard" />;
      } else {
        return <Redirect push to="/user/dashboard" />;
      }
  };

  const handleGoogle = async (response: any) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res: any) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          if (data?.user) authenticate(data.user.token, redirectUser(data.user));
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { loading, error, handleGoogle };
};

export default useFetch;
