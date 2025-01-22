import React, { useEffect, useState } from "react";
import { API, GOOGLE_CLIENT_ID } from "../../config/config";
import { Redirect } from "react-router";

const GoogleSignInButton: React.FunctionComponent<{
  setUser: (user: any) => void;
}> = ({ setUser }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response: any) => {
    setLoading(true);
    fetch(`${API}/signup-oauth2`, {
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
          localStorage.setItem("jwt", JSON.stringify(data?.user.token));
          setUser(data?.user)
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        theme: "filled_black",
        text: "continue_with",
        shape: "pill",
      });
    }
  }, [handleGoogle]);

  return <div id="signUpDiv" data-text="signup_with"></div>;
};

export default GoogleSignInButton;
