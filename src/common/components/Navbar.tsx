import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../paths/paths";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle the click event on the logout icon
  const handleLogoutIconClick = () => {
    // Remove the authentication token from local storage
    localStorage.removeItem("3analystics_token");
    // Display a success toast message for successful logout
    toast.success("Logout Successfully");
    navigate(paths.LOGIN);
  };

  // Conditionally render the sign-out icon only if not on the login page
  const isLoginPage = location.pathname === paths.LOGIN;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-danger">
        <div className="container">
          <h2 className="navbar-brand text-white font-weight-bold">
            3Analytics-Task
          </h2>
          {/* Conditionally render the sign-out icon only if not on the login page */}
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
