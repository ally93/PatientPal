import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function PatientsList(props) {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
      async function fetchPatients() {
        const url = "http://localhost:8000/api/patients";

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        }
      }

      fetchPatients();
    }, []);



    return (
    <div className="container">
        <h3 className="display-6 fw-bold">Patients List</h3>
        <button type="button" className="btn btn-outline-light">
        <NavLink className="nav-link" aria-current="page" to="/create-patient">
            Create a new patient
        </NavLink>
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
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.birth_date}</td>
              </tr>
            );
            })}
        </tbody>
        </table>
    </div>
    );
}
export default PatientsList;
