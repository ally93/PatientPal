import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

function PatientDetail(props) {
  const [patient, setPatient] = useState({});
  const { patient_id } = useParams();

  useEffect(() => {
    async function fetchPatient() {
      const url = "http://localhost:8000/api/patients/" + patient_id;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setPatient(data);
      }
    }

    fetchPatient();
  }, [patient_id]);

  return (
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
    </div>
  );
}
export default PatientDetail;
