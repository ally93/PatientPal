import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

function PatientsList(props) {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

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

  const deletePatient = async (patient_id) => {
    const url = `http://localhost:8000/api/patients/${patient_id}`;
    const fetchConfig = {
      method: "DELETE",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      window.location.reload(false);
    }
  };

  const redirect = (patient_id) => {
    navigate(`/patient/${patient_id}/update`);
  };

  return (
    <div className="container">
      <h3 className="display-6 fw-bold">Patients List</h3>
      <button type="button" className="btn btn-outline-light">
        <NavLink className="nav-link" aria-current="page" to="/patient/create">
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
  );
}
export default PatientsList;
