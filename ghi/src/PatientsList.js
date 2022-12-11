import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, getUserInfo } from "./useToken";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function PatientsList(props) {
  const [patients, setPatients] = useState([]);
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const userId = getUserInfo().id;

  useEffect(() => {
    async function fetchPatients() {
      const url = `${process.env.REACT_APP_PATIENTS_API_HOST}/api/patients`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const filtered = data.filter((patient) => patient.doctor_id === userId);
        setPatients(filtered);
      }
    }
    if (token) {
      fetchPatients();
    }
  }, [token, userId]);

  const deletePatient = async (patient_id) => {
    const url = `${process.env.REACT_APP_PATIENTS_API_HOST}/api/patients/${patient_id}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      const updatedPatients = patients.filter(
        (patient) => patient.id !== patient_id
      );
      setPatients(updatedPatients);
    }
  };

  const redirect = (patient_id) => {
    navigate(`/patient/${patient_id}/update`);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="display-6 fw-bold">Patients List</h3>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={() => navigate("/patient/create")}
        >
          Create a new patient
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Patient Id </th>
              <th>Name</th>
              <th>Date Of Birth</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => {
              return (
                <tr key={patient.id}>
                  <td>
                    <Link to={`/patient/${patient.id}`}>{patient.id}</Link>
                  </td>
                  <td>{patient.name}</td>
                  <td>{patient.birth_date}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deletePatient(patient.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => redirect(patient.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
export default PatientsList;
