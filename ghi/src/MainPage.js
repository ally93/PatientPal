// import { useAuthContext } from "./useToken";
import familyphoto from "./images/familyphoto.jpeg";

// import { Navigate } from "react-router-dom";
// import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function MainPage() {
  return (
    <>
      <Navbar />
      <h1 className="jumbotron">My Patient Portal</h1>

      <div>
        {/* <Link to="register"> register </Link> */}
        <img
          className="d-block mx-auto img-fluid w-100"
          src={familyphoto}
          alt="fam"
        />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
