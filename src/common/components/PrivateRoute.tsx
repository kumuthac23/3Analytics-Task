import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../paths/paths";
import { verifyToken } from "../../authservice";

function PrivateRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  // Function to check the authentication token in local storage
  const checkTokenInCookies = async () => {
    // Get the authentication token from local storage
    const authToken = localStorage.getItem("3analystics_token");
    if (authToken) {
      var isLoggedIn = await verifyToken(authToken);

      if (isLoggedIn) {
        navigate(paths.ROOT);
      } else {
        navigate(paths.LOGIN);
      }
    } else {
      navigate(paths.LOGIN);
    }
  };

  // to check the token when the component mounts
  useEffect(() => {
    checkTokenInCookies();
  }, []);
  return <div>{children}</div>;
}

export default PrivateRoute;
