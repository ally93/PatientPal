import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./App.css";
import PatientDetail from "./PatientDetail";
import PatientForm from "./PatientForm";
import PatientUpdate from "./PatientUpdateForm";
import PatientsList from "./PatientsList.js";
import MainPage from "./MainPage";
import QuestionnairesList from "./QuestionnairesList";
import ResgisterForm from "./RegisterForm";
import QuestionnaireDetail from "./QuestionnaireDetail";
import QuestionnaireForm from "./QuestionnaireForm";
import QuestionnaireEdit from "./QuestionnaireEdit";
// import MainPage from "./MainPage";
// import Nav from "./Nav";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuthContext } from "./useToken";
import LoginForm from "./Login";
// import SignOut from "./Logout";
import Logout from "./LogOutTest";


function App() {
  const { token } = useAuthContext();

  if (token) {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="patients" element={<PatientsList />} />

            <Route path="/logout" element={<Logout />} />

            <Route path="patient/:patient_id" element={<PatientDetail />} />
            <Route
              path="patient/:patient_id/update/"
              element={<PatientUpdate />}
            />
            <Route path="patient/create" element={<PatientForm />} />
            <Route path="questionnaires" element={<QuestionnairesList />} />

            <Route path="dashboard" element={<MainPage />} />
            <Route
              path="patient/:patient_id/questionnaires"
              element={<QuestionnairesList />}
            />
            <Route
              path="questionnaire/:questionnaire_id"
              element={<QuestionnaireDetail />}
            />
            <Route
              path="patient/:patient_id/questionnaire/create"
              element={<QuestionnaireForm />}
            />
            <Route
              path="patient/:patient_id/questionnaire/:questionnaire_id/edit"
              element={<QuestionnaireEdit />}
            />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="register" element={<ResgisterForm />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
