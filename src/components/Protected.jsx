import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ Component }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const login = localStorage.getItem("accessToken");
      console.log("access token from protected.jsx", login);
      if (login === null) {
        console.log("User is not logged in, navigating to login");
        navigate("/login");
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [navigate]);
  if (isLoggedIn) {
    return <Component />;
  }
}

export default Protected;
