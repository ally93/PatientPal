import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./App.css";
import PatientsList from "./PatientsList.js";
// import MainPage from "./MainPage";
// import Nav from "./Nav";


function App() {

  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <div className="container">
        <Routes>
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="patients" element={<PatientsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
