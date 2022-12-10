import { useAuthContext } from "./useToken";
import familyphoto from "./images/familyphoto.jpeg";

import { Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function MainPage() {
  const { token } = useAuthContext();



    return (
      <>
        <Navbar />
        <h1>My Patient Portal</h1>

        <div>
          {/* <Link to="register"> register </Link> */}
          <img src={familyphoto} alt="fam" />
        </div>
        <Footer />
      </>
    );
  


}

export default MainPage;
