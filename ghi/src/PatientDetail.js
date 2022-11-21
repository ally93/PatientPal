import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

function PatientDetail(props) {
  const [patient, setPatient] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchPatient() {
      const url = "http://localhost:8000/api/patients/" + params.patient_id;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setPatient(data);
      }
    }

    fetchPatient();
  }, []);

  return (
    <div className="container">
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
    </div>
  );
}
export default PatientDetail;
