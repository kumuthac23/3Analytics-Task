import React from "react";
import Navbar from "./common/components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="my-4">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
