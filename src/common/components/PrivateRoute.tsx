import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../paths/paths";
import { verifyToken } from "../../authservice";

function PrivateRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const checkTokenInCookies = async () => {
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

  useEffect(() => {
    checkTokenInCookies();
  }, []);
  return <div>{children}</div>;
}

export default PrivateRoute;
