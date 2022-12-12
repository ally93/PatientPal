import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import PatientDetail from "./PatientDetail";
import PatientForm from "./PatientForm";
import PatientUpdate from "./PatientUpdateForm";
import PatientsList from "./PatientsList.js";
import MainPage from "./MainPage";
import QuestionnairesList from "./QuestionnairesList";
import RegisterForm from "./RegisterForm";
import QuestionnaireDetail from "./QuestionnaireDetail";
import QuestionnaireForm from "./QuestionnaireForm";
import QuestionnaireEdit from "./QuestionnaireEdit";
// import MainPage from "./MainPage";
// import Nav from "./Nav";
import LoginForm from "./Login";
// import SignOut from "./Logout";
import Logout from "./Logout";
import { AuthProvider, useToken } from "./useToken";

import "bootstrap/dist/css/bootstrap.css";

function GetToken() {
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter basename="/module3-project-gamma/">
      {/* in case to test locally uncomment the line below */}
    {/* <BrowserRouter basename="/"> */}
      <AuthProvider>
        <GetToken />
        <div className="container">
          <Routes>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="/logout" element={<Logout />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
            />

            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/patients"
              element={
                <PrivateRoute>
                  <PatientsList />
                </PrivateRoute>
              }
            />

            <Route
              path="patient/:patient_id"
              element={
                <PrivateRoute>
                  <PatientDetail />
                </PrivateRoute>
              }
            />


            <Route
              path="patient/:patient_id/update/"
              element={
                <PrivateRoute>
                  <PatientUpdate />
                </PrivateRoute>
              }
            />

            <Route
              path="patient/create"
              element={
                <PrivateRoute>
                  <PatientForm />
                </PrivateRoute>
              }
            />


            <Route
              path="questionnaires"
              element={
                <PrivateRoute>
                  <QuestionnairesList />
                </PrivateRoute>
              }
            />


            <Route
              path="patient/:patient_id/questionnaires"
              element={
                <PrivateRoute>
                  <QuestionnairesList />
                </PrivateRoute>
              }
            />


            <Route
              path="questionnaire/:questionnaire_id"
              element={
                <PrivateRoute>
                  <QuestionnaireDetail />
                </PrivateRoute>
              }
            />


            <Route
              path="patient/:patient_id/questionnaire/create"
              element={
                <PrivateRoute>
                  <QuestionnaireForm />
                </PrivateRoute>
              }
            />


            <Route
              path="patient/:patient_id/questionnaire/:questionnaire_id/edit"
              element={
                <PrivateRoute>
                  <QuestionnaireEdit />
                </PrivateRoute>
              }
            />

          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
