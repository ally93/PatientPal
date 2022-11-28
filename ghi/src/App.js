import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./App.css";
import PatientDetail from "./PatientDetail";
import PatientForm from "./PatientForm";
import PatientsList from "./PatientsList.js";
import MainPage from "./MainPage";
import QuestionnairesList from "./QuestionnairesList";
import QuestionnaireDetail from "./QuestionnaireDetail";
import QuestionnaireForm from "./QuestionnaireForm";
import QuestionnaireEdit from "./QuestionnaireEdit";
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
          <Route path="patient/create" element={<PatientForm />} />
          <Route path="patient/:patient_id/questionnaires" element={<QuestionnairesList />} />
          <Route path="questionnaire/:questionnaire_id" element={<QuestionnaireDetail />} />
          <Route path="patient/:patient_id/questionnaire/create" element={<QuestionnaireForm />} />
          <Route path="patient/:patient_id/questionnaire/:questionnaire_id/edit" element={<QuestionnaireEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
