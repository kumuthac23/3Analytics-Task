import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../paths/paths";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutIconClick = () => {
    localStorage.removeItem("3analystics_token");
    navigate(paths.LOGIN);
  };

  // Conditionally render the sign-out icon only if not on the login page
  const isLoginPage = location.pathname === paths.LOGIN;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container">
          <h2 className="navbar-brand text-white font-weight-bold">
            3Analytics
          </h2>
          {!isLoginPage && (
            <i
              className="fa fa-sign-out text-white fa-2x"
              role="button"
              aria-hidden="true"
              onClick={handleLogoutIconClick}
            ></i>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
