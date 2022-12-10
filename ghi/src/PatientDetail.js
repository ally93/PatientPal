import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useAuthContext } from "./useToken";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function PatientDetail(props) {
  const [patient, setPatient] = useState({});
  const { patient_id } = useParams();
  const {token} = useAuthContext();

  useEffect(() => {
    async function fetchPatient() {
      const url = `${process.env.REACT_APP_PATIENTS_API_HOST}/api/patients/${patient_id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPatient(data);
      }
    }
    if (token) {
      fetchPatient();
    }

  }, [patient_id, token]);

  return (
    <>
      <Navbar />
      <div className="container">
        <button type="button" className="btn btn-outline-light">
          <NavLink className="nav-link" aria-current="page" to="/patients">
            All Patients
          </NavLink>
        </button>
        <h3 className="display-6 fw-bold">Patient Detail</h3>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{patient.name}</td>
            </tr>
            <tr>
              <th>Patient ID</th>
              <td>{patient.id}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{patient.birth_date}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{patient.email}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{patient.address}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{patient.gender}</td>
            </tr>
          </tbody>
        </table>
        <button type="button" className="btn btn-outline-light">
          <NavLink className="nav-link" aria-current="page" to="update">
            Edit Patient
          </NavLink>
        </button>

        <button type="button" className="btn btn-outline-light">
          <NavLink className="nav-link" aria-current="page" to={`/patient/${patient.id}/questionnaires/`}>
            Patient Questionnaires
          </NavLink>
        </button>
      </div>
      <Footer />
    </>
  );
}
export default PatientDetail;
