import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./App.css";
import PatientDetail from "./PatientDetail";
import PatientsList from "./PatientsList.js";
import MainPage from "./MainPage";
import QuestionnairesList from "./QuestionnairesList";
// import MainPage from "./MainPage";
// import Nav from "./Nav";


function App() {

  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patient/:patient_id" element={<PatientDetail />} />
          <Route path="questionnaires" element={<QuestionnairesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
