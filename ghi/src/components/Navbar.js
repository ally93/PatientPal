import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import ReorderIcon from "
import "../styles/Navbar.css";

function Navbar() {
  const [expandNavbar, setExpandNavbar] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setExpandNavbar(false);
  }, [location]);

  return (
    <div className="navbar" id={expandNavbar ? "open" : "close"}>
      <div className="toggleButton">
        <button
          onClick={() => {
            setExpandNavbar((prev) => !prev);
          }}
        >
          {/* <ReorderIcon /> */}
        </button>
      </div>
      <div className="links">
        <Link to="/"> Home </Link>
        <Link to="/patients"> Patients </Link>
        <Link to="patient/create"> Create Patient </Link>
        <Link to="logout"> Logout </Link>
        {/* <Link to="register"> register </Link> */}
      </div>
    </div>
  );
}

export default Navbar;
